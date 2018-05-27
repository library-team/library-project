import React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

const SavedEvents = ({fn, user}) => {
    console.log('from saved events', user);
    let savedEventsArray = [];
    let slicedEventsArray = [];
    if (user.savedEvents) {
        for(let key in user.savedEvents) {
            const event = user.savedEvents[key];
            event.dbKey = key;
            savedEventsArray.unshift(event);
        }
        slicedEventsArray = fn.sliceSavedEvents(savedEventsArray);
    }
    return (
        <section className="SavedEvents clearfix">
            <div className="userImg">
                <img src={user.photo} alt={user.name}/>
            </div>
            <div className="title">
                <h2>{user.name.split(' ', 1)}'s Saved Events</h2>
            </div>
            <div className="eventListContainer">
                <button className="buttonLeft" onClick={() => fn.handleButtonLeft(savedEventsArray.length)}><i className="fas fa-angle-left"></i></button>
                <button className="buttonRight" onClick={() => fn.handleButtonRight(savedEventsArray.length)}><i className="fas fa-angle-right"></i></button>
                <ul className="clearfix">
                    {(user.savedEvents) 
                    ? slicedEventsArray.map((event) => {
                        return (
                        <li key={event.dbKey}>
                            <h4>{event.title}</h4>
                            <h4>{event.date}</h4>
                            <h4>Time: {event.time}</h4>
                            <h4>Branch: {event.library}</h4>
                            <Link to={`/events/${event.id}`}
                            onClick={() => fn.eventPageChange(event)}
                            ><i className="fas fa-info-circle"></i> Event Info</Link>
                            <button onClick={() => fn.removeEvent(event.dbKey)}><i className="fas fa-times-circle"></i>Delete Event</button>
                        </li>
                        )
                    }) 
                    : (<li>
                        <p>Click on an event below to add your event here.</p>
                        </li>)
                    }   
                </ul>
                <button className="buttonBottom"><i className="fas fa-angle-down"></i></button>
            </div>
        </section>
    )
}

export default SavedEvents;