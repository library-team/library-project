import React from 'react';

class EventPage extends React.Component {
    constructor() {
        super()
    }
    
    render() {
        console.log('event clicked');

        console.log(this.props.match.params);
        
        
        return (
            <main>
                <h2>Event Title</h2>
                <img src="http://unsplash.it/500/500" alt="Image!"/>
                <ul>
                    <li>Event Location</li>
                    <li>Event Date: Start Date to End Date</li>
                    <li>Event Time: Start Time to End Time</li>
                    <li>Age Groups</li>
                    <li>Event Category</li>
                    {/* <li dangerouslySetInnerHTML={{ __html: event.description }}></li> */}
                </ul>
                <ul>
                    {/* <li><a href="#" onClick={(e) => { this.props.fn.saveEvent(e, event) }}><i className="fas fa-bookmark"></i> Save Event</a></li> */}
                    <li><a href="#"><i className="fas fa-calendar-plus"></i> Add to Calendar</a></li>
                </ul>
            </main>
        )
    }
}

export default EventPage;