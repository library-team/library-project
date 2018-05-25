import React from 'react';
import EventPage from './EventPage'
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

class EventCategory extends React.Component {
    constructor() {
        super()

        this.state = {
            loadNumber: 3
            // title: ''
        }

        this.loadMore = this.loadMore.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this)
    }

    // componentDidMount() {
        
        
    //     if (this.props.appState !== null) {
    //         const title = this.props.appState[0].title

    //         this.setState({
    //             title: title
    //         })

    //     }
    
    // }

    loadMore() {
        
        this.setState({
            loadNumber: 10
        })
    }

    render() {

        return (
        <section className="EventCategory">
            <h2>{this.props.title}</h2>
            {this.props.events.slice(0,this.state.loadNumber).map((event, i) => {
                
                return (
                <div className="event" key={i}>
                    <h3>{event.title}</h3>
                    <h4>{event.date}</h4>
                        <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
                    <Router>
                        <ul>
                                <li><Link to="/events">Event Info</Link>
                                    <Route path="/events" component={EventPage} /></li>
                            {/* <li><i className="fas fa-info-circle"></i> Event Info</a></li> */}
                            <li><a href="#"><i className="fas fa-bookmark"></i> Save Event</a></li>
                            <li><a href="#"><i className="fas fa-calendar-plus"></i> Add to Calendar</a></li>
                        </ul>
                    </Router>
                </div>
                )
            })}
            <button className="button" href="#" onClick={this.loadMore}>See more events...</button>
        </section> 
        )
    }

}

export default EventCategory;