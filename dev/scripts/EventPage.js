import React from 'react';

class EventPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            event: {}
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        
        console.log(this.props.eventPageData);
        
        
        // console.log(this.props.parentProps.match.params.event_id);

        // const event_id = this.props.parentProps.match.params.event_id
        

        // let eventObject = {}

        // for (const category in this.props.eventData) {
        //     const categoryArray = this.props.eventData[category]
        //     categoryArray.forEach(function(event) {
                
        //         if (event.id === event_id) {
        //             eventObject = event
        //         }
        //     })
        // }

        // // this.event = eventObject
        
        // this.setState({
        //     event: eventObject
        // })

        // console.log(this);
        
    }
    
    render() {

        console.log(this.props.eventPageData);
        
        
        return this.props.eventPageData ? (
            <main>
                <h2>{this.props.eventPageData.title}</h2>
                <img src="http://unsplash.it/500/500" alt="Image!"/>
                <ul>
                    <li>{this.props.eventPageData.library}</li>
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
        ) : <div></div>
    }
}

export default EventPage;