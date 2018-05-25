//Node modules
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

//Components
import EventCategory from './EventCategory';
import Header from './Header';
import SavedEvents from './SavedEvents';
import UpcomingEvents from './UpcomingEvents';
import EventPage from './EventPage.js';

//Other Modules
import fn from './fn'

const config = {
  apiKey: "AIzaSyDP7BfVejFMc-KfGmwYXRDPt7K4Sskr42U",
  authDomain: "library-events-project6.firebaseapp.com",
  databaseURL: "https://library-events-project6.firebaseio.com",
  projectId: "library-events-project6",
  storageBucket: "",
  messagingSenderId: "155710797406"
};

firebase.initializeApp(config);

class Hello extends React.Component {
	render(){
		return(
			<div>Helkjfjskhdfsjdhf
				<Link to="/events">Events</Link>
			</div>
		);
	}
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
	//   data: null,
	  user: null,
    eventData: null
    }

    //Bind all the 'this' of all functions in fn to App.
    for (const functionName in fn) {
    let func = fn[functionName];
    func = func.bind(this);
    fn[functionName] = func;
    }
    fn.logout();
  }

  componentDidMount() {
  //login-logout listener
  firebase.auth().onAuthStateChanged((user) => {
    console.log('user logged in', user);
    
    //If the user info returned from google popup is not null, then the user is logged in 
    if (user !== null) {
      let dbRefUser = firebase.database().ref('users/'+ user.uid);
      dbRefUser.once('value', (snapshot) => {
        if(snapshot.exists()) {
          let loggedInUser = snapshot.val();
          this.setState({
            loggedIn: true,
            user: loggedInUser
          })

        } else { //if the user does not already exist in the database- create them 
          console.log('new user created');
          const loggedInUser = {
            id: user.uid,
            name: user.displayName,
            photo: user.photoURL, 
            savedEvents: null
          }
          this.setState({
            loggedIn: true,
            user: loggedInUser
          })
          dbRefUser.set(loggedInUser);
        }
      })
    } else { //user is logging out 
      this.setState({
        loggedIn: false, 
        user: null
      })
    }
        
  })
  //event data listener
	let dbRef = firebase.database().ref('eventData');
	dbRef.on('value',(snapshot) => {

		console.log('event data from firebase', snapshot.val() );
		this.setState({
		  eventData: snapshot.val()
		});
	  });

    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      params: {
        reqUrl: 'https://opendata.tpl.ca/resources/events',
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }})
      .then((res) => {
		const data = res.data;

        // this.setState({
        //   data: data
		// });

		const filteredData =  fn.filterCategoriesByDate ( fn.filterEachEventCategory(data) );

		console.log(`All categories filtered`, filteredData  );

		dbRef.set(filteredData);

      }); //End of THEN


  } //End of Component Did Mount

    render() {
		return (
		<Router>
			<div>
			<header>
				<Header fn={fn}  appState={this.state} />
				{/* {(this.state.user) &&  <SavedEvents fn={fn} appState={this.state.eventData.saved} />} */}
			</header>
			<div className="wrapper">
				
				<Route exact path="/events" component={EventPage} />

				<aside>
				{(this.state.eventData)
					&& <UpcomingEvents fn={fn} appState={this.state.eventData.upcoming} />}
				</aside>
				<main>
					{(this.state.eventData)
					&& (
					 <React.Fragment> 

						{/* <Route exact path="/" component={Hello} /> */}
						<Route exact path="/" render={() => <EventCategory fn={fn} title="Children's Events" events={this.state.eventData.children} />} />
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Student Events" events={this.state.eventData.students} />} />
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Events for Seniors" events={this.state.eventData.seniors} />} />	
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Events for Newcomers to Canada" events={this.state.eventData.newcomers} />} />
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Events for Art Lovers" events={this.state.eventData.arts} />} />

					</React.Fragment>
							

						)}
					{/* <EventPage fn={fn} appState={this.state.data} /> */}
				</main>
				{/* This main will be switched out for EventPage module */}
			</div>
			</div>
		</Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
