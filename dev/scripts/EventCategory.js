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
        <section>
            <h2>{this.state.title}</h2>
            {this.props.appState.slice(0,this.state.loadNumber).map((event, i) => {
                
                return (
                <div className="event">
                    <h3>{event.title}</h3>
                    <h4>{event.date}</h4>
                </div>
                )
            })}
            <a href="#" onClick={this.loadMore}>See more...</a>
        </section> 
        )
    }

}

export default EventCategory;