import React from 'react';

class EventPage extends React.Component {
    constructor(props) {
        super(props)

    }

    // this.props.eventPageData.eventtypes

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
            imageLink = JSON.parse(this.props.eventPageData.otherinfo).largeImageURL
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
            <main className="EventPage">
                <h2>{this.props.eventPageData.title}</h2>
                <img src={this.getImage(this.props.eventPageData)} alt="Image!"/>
                <ul>
                    <li>{`Branch: ${this.props.eventPageData.library}`}</li>
                    <li>{this.checkEndDate(this.props.eventPageData)}</li>
                    <li>{`${this.props.eventPageData.time} to ${this.props.eventPageData.endtime}`}</li>
                    <li>{this.normalizeEventType(this.props.eventPageData.eventtypes)}</li>
                    <li className="EventPage__description" dangerouslySetInnerHTML={{ __html: this.props.eventPageData.description }}></li>
                </ul>
                <ul className="links">
                    {/* <li><a href="#" onClick={(e) => { this.props.fn.saveEvent(e, event) }}><i className="fas fa-bookmark"></i> Save Event</a></li> */}
                    <li><a href={`http://www.google.com/calendar/event?action=TEMPLATE&dates=${this.props.fn.getGoogleTime(this.props.eventPageData)}&text=${this.props.eventPageData.title}&location=Toronto+Public+Library+${this.props.eventPageData.library}&details=${this.props.eventPageData.description}`}><i className="fas fa-calendar-plus"></i> Add to Calendar</a></li>
                </ul>
            </main>
        ) : <div></div>
    }
}

export default EventPage;