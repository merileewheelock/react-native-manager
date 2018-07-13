// this is one action creator to handle any update to the form
// if update name, will send a prop of "name" and a value of the new name
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};

export const employeeCreate = ({ name, phone, shift }) => {
	// console.log(name, phone, shift);
	const { currentUser } = firebase.auth();

	// this is a requirement of redux-thunk (middleware for async actions)
	return (dispatch) => {
		// the below is a path to our JSON data store
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.push({ name, phone, shift })
			.then(() => {
				dispatch({ type: EMPLOYEE_CREATE });
				Actions.pop() // returns to previous scene
			});
	};
};

export const employeesFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			// anytime data comes from this ref, call fat arrow function with object (snapshot)
			// to describe the data in there
			.on('value', snapshot => {
				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() })
			});
	};
};
