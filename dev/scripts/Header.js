import React from 'react';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

const Header = (props) => {
    return (
        <section className="Header clearfix" id="Header">
            <div className="headerTitle clearfix">
                <div className="logo">
                    <img src="../public/assets/bookIcon.svg" alt="Outline of an open book"/>
                </div>
                <h1>Library Events</h1>
            </div>
            <button onClick={() => props.fn.displayDropdown()} className='dropdownBtn hide'><i className="fas fa-bars"></i></button>
            <nav className={`mainNav ${(props.appState.displayHamMenu) ? '' : 'mobileHide'}`}>
                <ul className={'dropdownContent clearfix'} onClick={() => props.fn.displayDropdown()}>
                    <li onClick={(e) => props.fn.handleNavClick(e, "children")
                    }>
                        <Link to="/#children" >Childrens Events</Link>
                    </li>
                    <li onClick={(e) => props.fn.handleNavClick(e, "students")
                    }>
                        <Link to="/#students">Student Events</Link>
                    </li>
                    <li onClick={(e) => props.fn.handleNavClick(e, "seniors")
                    }>
                        <Link to="/#seniors">Seniors Events</Link>
                    </li>
                    <li onClick={(e) => props.fn.handleNavClick(e, "newcomers")
                    }>
                        <Link to="/#newcomers">New Canadians Events</Link>
                    </li>
                    <li onClick={(e) => props.fn.handleNavClick(e, "arts")
                    }>
                        <Link to="/#arts">Art Events</Link>
                    </li>
                </ul>
            </nav>
            <div className="headerButtons">
                <div className="login">
                {(props.appState.user === null)
                   ? <button onClick={props.fn.loginWithGoogle}>Login</button>
                    : <button onClick={props.fn.logout}>Log Out</button>
                }
                </div>
                <div className="locationButton">
                {(props.appState.fullData && props.appState.renderNearbyEvents === false )
                   && <button onClick={props.fn.getNearbyEvents} >Events Nearby</button>
    
                }
                {( props.appState.renderNearbyEvents === true )
                   && <button onClick={() => props.fn.thisApp().setState({renderNearbyEvents: false })} >Citywide Events</button>
                }
                </div>
            </div> {/* header button container */}
            <div className={`homeButton ${(props.appState.displayHomeButton) ? 'display' : 'hide'}`} onClick={() => {
                props.fn.thisApp().setState({
                    displayHamMenu: false,
                    savedMobileExpand: false
                });
                document.querySelector('#Header').scrollIntoView({behavior: 'smooth'})}}>
                <Link to="/#Header"><i className="fas fa-home" title="Back to Top of Page"></i></Link>
            </div>
        </section>
    )
}

export default Header;