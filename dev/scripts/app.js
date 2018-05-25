//Node modules
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase';

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
  }

  componentDidMount() {
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
        <div>
          <header>
            <Header fn={fn}  appState={this.state.data} />
            {/* {(this.state.user) &&  <SavedEvents fn={fn} appState={this.state.eventData.saved} />} */}
          </header>
          <div className="wrapper">
            <aside>
			  {(this.state.eventData)
				&& <UpcomingEvents fn={fn} appState={this.state.eventData.upcoming} />}
            </aside>
            <main>
			{(this.state.eventData)
			&& (
			<React.Fragment>
				<EventCategory fn={fn} title="Children's Events"  events={this.state.eventData.children} />}
				<EventCategory fn={fn} title="Student Events" events={this.state.eventData.students} />
        <EventCategory fn={fn} title="Events for Seniors" events={this.state.eventData.seniors} />
        <EventCategory fn={fn} title="Events for Newcomers to Canada" events={this.state.eventData.newcomers} />
        <EventCategory fn={fn} title="Events for Art Lovers" events={this.state.eventData.arts} />
			</React.Fragment>
			)}
              {/* <EventPage fn={fn} appState={this.state.data} /> */}
            </main>
            {/* This main will be switched out for EventPage module */}
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
