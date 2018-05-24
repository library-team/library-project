import React from 'react';
import firebase from 'firebase';

const fn = {};

fn.test = function (testString) {
  (testString) ? console.log(testString) : null ;
 console.log(`Should be the App`, this)
}

fn.thisApp = function () {
  return this;
}



fn.loginWithGoogle = function () {
      console.log('clicked the button');
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
          .then((res) => {
              console.log(res);
              this.setState ({
                loggedIn: true,
                user: res.user
              })
          })
          .catch((err) => {
              console.log(err);
          })
  }

export default fn