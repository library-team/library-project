import React from 'react';

const Header = (props) => {
    return (
        <section className="Header clearfix">
            <div className="headerTitle clearfix">
                <div className="logo">
                    <img src="../public/assets/bookIcon.svg" alt="Outline of an open book"/>
                </div>
                <h1>Library Events</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="">Childrens Events</a></li>
                    <li><a href="">Youth Events</a></li>
                    <li><a href="">Seniors Events</a></li>
                    <li><a href="">New Canadians Events</a></li>
                    <li><a href="">Art Events</a></li>
                </ul>
            </nav>
            <div className="login">
                <button onClick={props.fn.loginWithGoogle}>Login</button>
            </div>
        </section>
    )
}
//set stated for logged in
//bind function below
//set props in Header component

// loginWithGoogle() {
//     console.log('clicked the button');
//     const provider = new firebase.auth.GoogleAuthProvider();

//     firebase.auth().signInWithPopup(provider)
//         .then((user) => {
//             console.log(user);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }
export default Header;