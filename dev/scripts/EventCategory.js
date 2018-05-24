import React from 'react';

class EventCategory extends React.Component {
    constructor() {
        super()

        this.state = {
            loadNumber: 3,
            title: ''
        }

        this.loadMore = this.loadMore.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        
        
        if (this.props.appState !== null) {
            const title = this.props.appState[0].title

            this.setState({
                title: title
            })

        }
    
    }

    loadMore() {
        
        console.log('clickity click');

        this.setState({
            loadNumber: 10
        })
    }

    render() {

        return (
        <section className="EventCategory">
            <h2>{this.state.title}</h2>
            {this.props.appState.slice(0,this.state.loadNumber).map((event, i) => {
                
                return (
                <div className="event">
                    <h3>{event.title}</h3>
                    <h4>{event.date}</h4>
                        <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
                    <ul>
                        <li><a href="#"><i class="fas fa-info-circle"></i> Event Info</a></li>
                        <li><a href="#"><i class="fas fa-bookmark"></i> Save Event</a></li>
                        <li><a href="#"><i class="fas fa-calendar-plus"></i> Add to Calendar</a></li>
                    </ul>
                    
                </div>
                )
            })}
            <a className="button" href="#" onClick={this.loadMore}>See more events...</a>
        </section> 
        )
    }

}

export default EventCategory;