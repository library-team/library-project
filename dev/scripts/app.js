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
import Footer from './Footer'

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
	eventData: null,
	eventPageData: null,
	dbRefUser: null,
	showModal: false,
	message: 'hi',
	savedStart: 0, 
	displayHamMenu: false, 
	savedMobileExpand: false
    }

    //Bind all the 'this' of all functions in fn to App.
    for (const functionName in fn) {
    let func = fn[functionName];
    func = func.bind(this);
    fn[functionName] = func;
    }
    // fn.logout();
  }

  componentDidMount() {
  //login-logout listener, this passes the user object to it's callback. If logged out, it passes null.
  firebase.auth().onAuthStateChanged(fn.handleAuthChange);

	let dbRef = firebase.database().ref('eventData');
	dbRef.on('value',(snapshot) => {
		// console.log('event data from firebase', snapshot.val() );
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

		console.log(data);


		const filteredData =  fn.filterCategoriesByDate ( fn.filterEachEventCategory(data) );

		// console.log(`All categories filtered`, filteredData  );

		dbRef.set(filteredData);
		console.log('filtered data', filteredData)
      }); //End of THEN


  } //End of Component Did Mount

    render() {
		return (
		<Router>
			<React.Fragment>
			<header>
				<Header fn={fn}  appState={this.state} />
				{(this.state.user) &&  <SavedEvents fn={fn} user={this.state.user} />}
			</header>
			<div className="wrapper clearfix">
					<div className={`modal ${(this.state.showModal) ? 'show' : ''}`} onClick={fn.handleModalClick}>
					<div className='modalContent'>
						<h3>{this.state.message}</h3>
					</div>
				</div>
				<Route path="/events/:event_id" component={(parentProps) => <EventPage fn={fn} parentProps={parentProps} eventData={this.state.eventData} eventPageData={this.state.eventPageData}/>} />

				<aside>
				{(this.state.eventData)
					&& <UpcomingEvents fn={fn} appState={this.state.eventData.upcoming} />}
				</aside>
				<main>
					{(this.state.eventData)
					&& (
					 <React.Fragment>

						{/* <Route exact path="/" component={Hello} /> */}
						<Route exact path="/" render={() => <EventCategory fn={fn} title="Children's Events" events={this.state.eventData.children} idName="children"/>} />
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Student Events" events={this.state.eventData.students} idName="students"  />} />
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Events for Seniors" events={this.state.eventData.seniors} idName="seniors"  />} />
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Events for Newcomers to Canada" events={this.state.eventData.newcomers} idName="newcomers" />} />
						<Route exact path="/" component={() => <EventCategory fn={fn} title="Events for Art Lovers" events={this.state.eventData.arts} idName="arts" />} />

					</React.Fragment>


						)}
					{/* <EventPage fn={fn} appState={this.state.data} /> */}
				</main>
				{/* This main will be switched out for EventPage module */}
			</div>
			<Footer />
			</React.Fragment>
		</Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
