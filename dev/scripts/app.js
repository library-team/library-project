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
	  data: null,
	  user: null
    }

    //Bind all the 'this' of all functions in fn to App.
    for (const functionName in fn) {
    let func = fn[functionName];
    func = func.bind(this);
    fn[functionName] = func;
  }
  }

  componentDidMount() {
    console.log('hello');
    fn.test();
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
        console.log(res.data);
        console.log(this);

        this.setState({
          data: res.data
        })
      })


      // console.log(`UNSORTED DATA:
      // `,data )
      // console.log(`SORTED DATA:
      // `,  sortByDate(data)  );


      // console.log( getUpcoming(20,  '2018/05/23', sortByDate(data) )  )  ;
      // console.log(getAgeGroups() );
      // console.log(getUniqueEventTypes() );



  } //End of Component Did Mount

    render() {
      return (
        <div>
          <header>
            <Header fn={fn}  appState={this.state.data} />
            {(this.state.user) &&  <SavedEvents fn={fn} appState={this.state.data} />}
          </header>
          <div className="wrapper">
            <aside>
              {(this.state.data) && <UpcomingEvents fn={fn} appState={this.state.data} />}
            </aside>
            <main>
            {(this.state.data) && <EventCategory fn={fn} appState={this.state.data} />}
            {/* <EventCategory appState={this.state.data} />
            <EventCategory appState={this.state.data} />
            <EventCategory appState={this.state.data} />
            <EventCategory appState={this.state.data} /> */}
              <EventPage fn={fn} appState={this.state.data} />
            </main>
            {/* This main will be switched out for EventPage module */}
          </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
