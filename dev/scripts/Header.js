import React from 'react';

const Header = (props) => {
    const displayDropdown = function() {
        let elementToShow = document.querySelector('dropdownContent').classList;
        elementToShow.add('show');
    }
    return (
        <section className="Header clearfix">
            <div className="headerTitle clearfix">
                <div className="logo">
                    <img src="../public/assets/bookIcon.svg" alt="Outline of an open book"/>
                </div>
                <h1>Library Events</h1>
            </div>
            <nav className="mobileNav hide">
                <button onClick={displayDropdown}className="dropdownBtn"><i className="fas fa-bars"></i></button>
                <ul className="dropdownContent clearfix">
                    <li><a href="#children">Childrens Events</a></li>
                    <li><a href="#students">Student Events</a></li>
                    <li><a href="#seniors">Seniors Events</a></li>
                    <li><a href="#newcomers">New Canadians Events</a></li>
                    <li><a href="#arts">Art Events</a></li>
                </ul>
            </nav>
            <nav className="regularNav">
                <ul className="dropdownContent clearfix">
                    <li><a href="#children">Childrens Events</a></li>
                    <li><a href="#students">Student Events</a></li>
                    <li><a href="#seniors">Seniors Events</a></li>
                    <li><a href="#newcomers">New Canadians Events</a></li>
                    <li><a href="#arts">Art Events</a></li>
                </ul>
            </nav>
            <div className="login">
            {(props.appState.user === null)
               ? <button onClick={props.fn.loginWithGoogle}>Login</button>
                : <button onClick={props.fn.logout}>Log Out</button>
            }
            </div>
        </section>
    )
}

export default Header;