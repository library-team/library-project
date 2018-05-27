import React from 'react';

const SavedEvents = ({fn, user}) => {
    console.log('from saved events', user);
    return (
        <section className="SavedEvents clearfix">
            <div className="userImg">
                <img src={user.photo} alt={user.name}/>
            </div>
            <div className="title">
                <h2>{user.name.split(' ', 1)}'s Saved Events</h2>
            </div>
            <div className="eventListContainer">
                <button className="buttonLeft"><i className="fas fa-angle-left"></i></button>
                <button className="buttonRight"><i className="fas fa-angle-right"></i></button>
                <ul>
                    {(user.savedEvents) 
                    ? <p>Has saved events</p> 
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