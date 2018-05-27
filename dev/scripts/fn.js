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

	firebase.auth().signInWithPopup(provider);
}

fn.logout = function () {
	console.log('log out function')
	firebase.auth().signOut();
}


fn.handleAuthChange = function (user) {
	//If the user info returned from google popup is not null, then the user is logged in
	console.log(`user from handle auth change`, user);
	if (user !== null) {
		let dbRefUser = firebase.database().ref('users/'+ user.uid);
		//Add value listener to user node in database
		dbRefUser.on('value', (snapshot) => {
		  if(snapshot.exists()) {
			let loggedInUser = snapshot.val();

			this.setState({
			  loggedIn: true,
			  user: loggedInUser,
			});

			this.dbRefUser = dbRefUser;
		  } else { //if the user does not already exist in the database- create them
			console.log('new user created');
			const loggedInUser = {
			  id: user.uid,
			  name: user.displayName,
			  photo: user.photoURL,
			  //savedEvents
			}
			this.setState({
			  loggedIn: true,
			  user: loggedInUser
			})
			dbRefUser.set(loggedInUser);
		  }

		});
	} else { //user is logging out
		console.log(`auth change log out`)
		this.setState({
		loggedIn: false,
		user: null
		});

		//Remove the value event listener
		if (this.dbRefUser) {
			this.dbRefUser.off();
		}
	}//end of else statement
}

fn.saveEvent = function (e, event) {
e.preventDefault();
console.log(event);

// if (this.state.user) {
// 	const dbRefSaved =  firebase.database().ref('users/' + this.state.user.id + '/savedEvents');

// 	dbRefSaved.push(event);

// }

//If user is logged in, push event to that user's savedEvents node


//If user is not logged in prompt them to log in

}







fn.getAgeGroups = function (data) {
let ageGroups =  data.reduce( (allAges, event) => {
  let  ageGroups =  event["agegroups"];
  // console.log(ageGroups);

  ageGroups = ageGroups.split(',').map(age => age.trim() );
  return allAges.concat(ageGroups);

}, [] );

return fn.getUnique(ageGroups);

}

fn.getUnique = function(array) {
	const uniqueSet = new Set(array);
	return  Array.from(uniqueSet);
}


fn.getUniqueEventTypes = function (data) {
	let eventTypes = data.reduce(( allTypes, event) => {
		return allTypes.concat( [ event["eventtype1"] ]  );
	}, [] );

	return fn.getUnique( eventTypes );
}
//Function Calls to get the age groups and event types (not used at runtime)
		// console.log(`age groups`, fn.getAgeGroups(data) );
		// console.log(`get unique event types`,  fn.getUniqueEventTypes(data) );


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
	// console.log(dataArr);

	const dataCopy = Array.from(dataArr);

	dataCopy.sort((a,b) => {
    // console.log(a['date1'], b['date1'], compareDates( a['date1'], b['date1'])  );

    //This sort it by starting date
	return fn.compareDates( a['date1'], b['date1']);

	} );
	return dataCopy;
}


  //Today's Date is given as a 'yyyy/mm/dd' string
  fn.getUpcoming = function (numberToGet, today, sortedData) {

    let upcoming = [];

    //Start at the end of the data array since the data is sorted for furthest future events to be low index.
    let i = sortedData.length - 1 ;
    while (upcoming.length < numberToGet && i >= 0) {
      if (fn.compareDates(today, sortedData[i]['date1'] )  >= 0 ) {
        upcoming.push( sortedData[i] )
      }

      i--;
    }

    return upcoming;

  }//End of get upcoming

fn.filterByAgeGroup = function (data, ageGroups) { //is array of age group strings
	return data.filter( (event) => {
		let result = false;

		ageGroups.forEach(group =>    {
			//If the event age groups string includes one of the selected age groups then set result to true. Else it will remain false.
		 if (event.agegroups.includes(group) === true ) {	result = true; }
		});
		return result;
	});
}

fn.filterByEventType = function (data, eventTypes) {
	return data.filter( (event) => {
		let result = false;

		eventTypes.forEach(type =>    {

		 if (event.eventtypes.includes(type) === true ) {	result = true; }
		});
		return result;
	});

}


fn.filterEachEventCategory = function (data) {
	const ageFilters = {
		children: ['School-Age Children', 'Pre-School Children', 'All Children'],
		students: ['Teen'],
		seniors: ['Older Adult']
	}

	const typeFilters = {
		arts: [
		"Art Exhibits",
		"Museum & Arts Pass",
		"Artists in the Library"],

		newcomers: [
		"ESL & Newcomer Programs",
		"Adult Literacy"]
	   }

	const categories = {};
	categories.upcoming = data;
	categories.children = fn.filterByAgeGroup(data, ageFilters.children ) ;
	categories.students = fn.filterByAgeGroup(data, ageFilters.students) ;
	categories.seniors = fn.filterByAgeGroup(data, ageFilters.seniors)  ;
	categories.newcomers = fn.filterByEventType(data, typeFilters.newcomers) ;
	categories.arts = fn.filterByEventType(data, typeFilters.arts);
	// categories.saved = null;
	return categories;
}


fn.filterCategoriesByDate = function (categories) {
	const dateObj = new Date;
	const today = `${dateObj.getFullYear()}/${
		//If the month + 1 is less than 10 add a zero
		(dateObj.getMonth()+1 < 10  ) ? '0' + (dateObj.getMonth()+1)  : dateObj.getMonth()+1
	}/${  dateObj.getDate() < 10  ?  '0' + dateObj.getDate()  :   dateObj.getDate()}`;
	for (const category in categories) {
		let catArr = categories[category];
		catArr = fn.sortByDate(catArr);
		categories[category] = fn.getUpcoming(20, today, catArr);
	}
	return categories;

}

fn.eventPageChange = function (event) {
	this.setState({
		eventPageData: event
	})
	
}





export default fn


