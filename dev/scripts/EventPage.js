import React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

class EventPage extends React.Component {
    constructor(props) {
        super(props)

    }

    normalizeEventType(eventTypeString) {
        const eventType = eventTypeString.split(',')
            .filter(function (type) {
                return type.length > 3
            })
            .map(function (type) {
                return type.trim()
            })
            .map(function (type) {
                return type.slice(3)
            })
            .join(', ');
            
            return eventType;
    }

    getImage(eventData) {

        let imageLink = '';

        if (eventData.otherinfo) {
            const otherInfo = JSON.parse(this.props.eventPageData.otherinfo)
            
            if (otherInfo === null) {
                imageLink = '../public/assets/bookIcon--dark.svg'
            } else if (otherInfo.largeImageURL) {
                imageLink = otherInfo.largeImageURL;
            } else if (otherInfo.mediumImageURL) {
                imageLink = otherInfo.mediumImageURL;
            } else if (otherInfo.smallImageURL) {
                imageLink = otherInfo.smallImageURL
            } else {
                imageLink = '../public/assets/bookIcon--dark.svg'
            }

        } else {
            imageLink = '../public/assets/bookIcon--dark.svg'
        }
        
        return imageLink
    }

    checkEndDate(event) {

        if (event.enddate) {
            return event.date + ' to ' + event.enddate
        } else {
            return event.date
        }
    }
    
    render() {

        console.log(this.props.eventPageData);
        
        return this.props.eventPageData ? (
            // <React.Fragment>
            // <Link className="button button--back" id="event-top" to="/"><i class="far fa-caret-square-left"></i> Back to Main Page</Link>
            <main className="EventPage" id="event">
                <h2>{this.props.eventPageData.title}</h2>
                <img src={this.getImage(this.props.eventPageData)} alt="Image!"/>
                <ul>
                    <li>{`Branch: ${this.props.eventPageData.library}`}</li>
                    <li>{this.checkEndDate(this.props.eventPageData)}</li>
                    <li>{`${this.props.eventPageData.time} to ${this.props.eventPageData.endtime}`}</li>
                    <li>{this.normalizeEventType(this.props.eventPageData.eventtypes)}</li>
                </ul>
                <p className="EventPage__description" dangerouslySetInnerHTML={{ __html: this.props.eventPageData.description }}></p>
                <ul className="links">
                    <li><a href="#" onClick={(e) => { this.props.fn.saveEvent(e, this.props.eventPageData) }}><i className="fas fa-bookmark"></i> Save Event</a></li>
                    <li><a href={`http://www.google.com/calendar/event?action=TEMPLATE&dates=${this.props.fn.getGoogleTime(this.props.eventPageData)}&text=${this.props.eventPageData.title}&location=Toronto+Public+Library+${this.props.eventPageData.library}&details=${this.props.eventPageData.description}`}><i className="fas fa-calendar-plus"></i> Add to Calendar</a></li>
                </ul>
            </main>
        ) : <div></div>
    }
}

export default EventPage;