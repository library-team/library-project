import React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

class UpcomingEvents extends React.Component {
    constructor() {
        super()

        this.state = {
            loadNumber: 10,
            title: ''
        }

        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {

        console.log('clickity click');

        this.setState({
            loadNumber: 20
        })
    }

    render() {

        return (
            <section>
                <h2>Upcoming Events</h2>
                {this.props.appState.slice(0, this.state.loadNumber).map((event, i) => {

                    return (
                        <div className="event" key={i}>
                            <h3>{event.title}</h3>
                            <h4>{event.date}</h4>
                            <li onClick={() => this.props.fn.eventPageChange(event)}>
                                <Link to={`/events/${event.id}`}><i className="fas fa-info-circle"></i> Event Info</Link>
                            </li>
                            <li><a href="#" onClick={(e) => { this.props.fn.saveEvent(e, event) }}><i className="fas fa-bookmark"></i> Save Event</a></li>
                        </div>
                    )
                })}
                {this.state.loadNumber === 10 && <button className="button" href="#" onClick={this.loadMore}>See more events...</button>}
            </section>
        )
    }

}

export default UpcomingEvents;