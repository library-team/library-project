import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      data: null
    }
  }

  componentDidMount() {

    axios.get('https://cors-anywhere.herokuapp.com/https://opendata.tpl.ca/resources/events')
    .then((res)=>{
      console.log(res.data);
      console.log(this);
      
      this.setState({
        data: res.data
      })


    })
  }

    render() {
      return (
        <div>
          {/* <Header />
          <SavedEvents />
          <UpcomingEvents />
          <EventCategory /> */}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
