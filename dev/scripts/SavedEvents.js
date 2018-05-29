import React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

const SavedEvents = ({fn, user}) => {
    // console.log('from saved events', user);
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
	let savedEventsToMap;
	if (fn.thisApp().state.savedMobileExpand) {
		savedEventsToMap = savedEventsArray;
	} else {
		savedEventsToMap = slicedEventsArray;
	}

    return (
        <section className="SavedEvents clearfix">
            <div className="userImg">
                <img src={user.photo} alt={user.name}/>
            </div>
            <div className="title">
                <h2>{user.name.split(' ', 1)}'s Saved Events</h2>
            </div>
            <div className={`eventListContainer ${(fn.thisApp().state.savedMobileExpand === true ) ? 'mobileExpand' : '' }`}>
                <button className="buttonLeft" onClick={() => fn.handleButtonLeft(savedEventsArray.length)}><i className="fas fa-angle-left"></i></button>
                <button className="buttonRight" onClick={() => fn.handleButtonRight(savedEventsArray.length)}><i className="fas fa-angle-right"></i></button>
                <ul className="clearfix">
                    {(user.savedEvents)
                    ? savedEventsToMap.map((event) => {
                        return (
                        <li key={event.dbKey}>
                            <h4 className="eventTitle" >{event.title}</h4>
                            <h4>{event.date}</h4>
                            <h4>{event.time}</h4>
                            <h4>{event.library}</h4>
                            <Link to={`/events/${event.id}`}
                            onClick={(e) => {
								fn.eventPageChange(event);
								fn.handleNavClick(e, 'event');
							} }
                            ><i className="fas fa-info-circle"></i> Event Info</Link>
							<a href={`http://www.google.com/calendar/event?action=TEMPLATE&dates=${fn.getGoogleTime(event)}&text=${event.title}&location=Toronto+Public+Library+${event.library}&details=${event.description}`}><i className="fas fa-calendar-plus"></i> Calendar</a>
                            <button className="deleteEvent"  onClick={() => fn.removeEvent(event.dbKey)}><i className="fas fa-times-circle"></i> Delete Event</button>
                        </li>
                        )
                    })
                    : (<li>
                        <p>Click on an event below to add your event here.</p>
                        </li>)
                    }
                </ul>

            </div>
			<button className={`buttonBottom ${(fn.thisApp().state.savedMobileExpand === true ) ? 'mobileExpand' : '' }`}
				onClick={(e) => {
					fn.thisApp().setState({ savedMobileExpand: !fn.thisApp().state.savedMobileExpand });
					if (fn.thisApp().state.savedMobileExpand === true ) {
						fn.handleNavClick(e, "Header");
					}
				} }
			><i className="fas fa-angle-down"></i></button>
        </section>
    )
}

export default SavedEvents;