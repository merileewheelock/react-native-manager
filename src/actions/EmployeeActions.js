// this is one action creator to handle any update to the form
// if update name, will send a prop of "name" and a value of the new name
import firebase from 'firebase';
import {
	EMPLOYEE_UPDATE
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

	// the below is a path to our JSON data store
	firebase.database().ref(`/users/${currentUser.uid}/employees`)
		.push({ name, phone, shift });
};