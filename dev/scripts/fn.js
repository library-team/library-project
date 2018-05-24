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

fn.handleChange = function (e) {
  this.setState ({
    [e.target.name]: e.target.value
  });
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



fn.getAgeGroups = function () {
let ageGroups =  data.reduce( (allAges, event) => {
  let  ageGroups =  event["agegroups"];
  // console.log(ageGroups);

  ageGroups = ageGroups.split(',').map(age => age.trim() );
  return allAges.concat(ageGroups);

}, [] );

return getUnique(ageGroups);

}

fn.getUnique = function(array) {
	const uniqueSet = new Set(array);
	return  Array.from(uniqueSet);
}


fn.getUniqueEventTypes = function () {
	let eventTypes = data.reduce(( allTypes, event) => {
		return allTypes.concat( [ event["eventtype1"] ]  );
	}, [] );

	return getUnique( eventTypes );

}

//Takes dates in 'yyyy/mm/dd' format
fn.compareDates = function (date1, date2 ) {
	date1 = date1.split('/');
	date2 = date2.split('/');

	for (let i = 0; i < 3; i++) {
		if (date1[i] > date2[i]) {
		  return -1;
		} else if (date1[i] < date2[i]) {
		  return 1;
		}
	}
  //If it has not returned after the for loop this means the dates are equal.
	return 0;
}


fn.sortByDate = function (dataArr ) {
	const dataCopy = Array.from(dataArr);

	dataCopy.sort((a,b) => {
    // console.log(a['date1'], b['date1'], compareDates( a['date1'], b['date1'])  );

    //This sort it by starting date
	return compareDates( a['date1'], b['date1']);

	} );
	return dataCopy;
}


  //Today's Date is given as a 'yyyy/mm/dd' string
  function getUpcoming (numberToGet, today, sortedData) {

    let upcoming = [];

    //Start at the end of the data array since the data is sorted for furthest future events to be low index.
    let i = sortedData.length - 1 ;
    while (upcoming.length < numberToGet && i >= 0) {
      if (compareDates(today, sortedData[i]['date1'] )  >= 0 ) {
        upcoming.push( sortedData[i] )
      }

      i--;
    }

    return upcoming;

  }//End of get upcoming



export default fn