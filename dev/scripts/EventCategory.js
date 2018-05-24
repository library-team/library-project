import React from 'react';

const app = {};

// const EventCategory = (props) => {
class EventCategory extends React.Component {
    constructor() {
        super()

        this.state = {
            loadNumber: 3
        }

        this.clickityClick = this.clickityClick.bind(this);
    }

    componentDidMount() {
        
    }

    clickityClick() {
        
        console.log('clickity click');

        this.setState({
            loadNumber: 10
        })
    }

    render() {

        return this.props.appState === null ? null : (
        <section>
            <h2>Children's Events</h2>
            {this.props.appState.slice(0,this.state.loadNumber).map((event, i) => {
                
                return (
                <div className="event">
                    <h3>{event.title}</h3>
                    <h4>{event.date}</h4>
                </div>
                )
            })}
            <a href="#" onClick={this.clickityClick}>See more...</a>
        </section> 
        )
    }

}

export default EventCategory;