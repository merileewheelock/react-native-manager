// this is one action creator to handle any update to the form
// if update name, will send a prop of "name" and a value of the new name
import {
	EMPLOYEE_UPDATE
} from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	}
};