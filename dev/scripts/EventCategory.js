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
        }

        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        
        this.setState({
            loadNumber: 10
        })
    }

    render() {

        return (
        <section className="EventCategory">
            <h2>{this.props.title}</h2>
            {this.props.events.slice(0,this.state.loadNumber).map((event) => {

                return (
                <div className="event" key={event.id}>
                    <h3>{event.title}</h3>
                    <h4>{event.date}</h4>
                    
                        <p dangerouslySetInnerHTML={{ __html: event.description }}></p>

                        <ul className="links">
                            <li onClick={() => this.props.fn.eventPageChange(event)}>
                                <Link to={`/events/${event.id}`}><i className="fas fa-info-circle"></i> Event Info</Link>
                                {/* <Route path="/events" component={EventPage} /> */}
                            </li>
                            {/* <li><i className="fas fa-info-circle"></i> Event Info</a></li> */}
                            <li><a href="#" onClick={(e)=>{this.props.fn.saveEvent(e, event)}}><i className="fas fa-bookmark"></i> Save Event</a></li>
                            <li><a href="#"><i className="fas fa-calendar-plus"></i> Add to Calendar</a></li>
                        </ul>

                </div>
                )
            })}
            <button className="button" href="#" onClick={this.loadMore}>See more events...</button>
        </section> 
        )
    }

}

export default EventCategory;