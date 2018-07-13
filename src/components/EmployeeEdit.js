import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave } from '../actions';
import { Card, CardSection, Button } from './common';

class EmployeeEdit extends Component {
	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, phone, shift } = this.props;
		console.log(name, phone, shift);

		// when a user comes to employee edit, they have clicked on a name wiht a unique uid
		// this calls event handler of ListItem, which transitions to employeeEdit,
		// which passes employee as a prop
		this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid })
	}

	onTextPress() {
		const { phone, shift } = this.props;

		Communications.text(phone, `Your upcoming shift is on ${shift}.`);
	}

	render() {
		return (
			<Card>
				<EmployeeForm />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>
						Text Schedule
					</Button>
				</CardSection>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, phone, shift } = state.employeeForm;
	console.log({ name, phone, shift })
	return { name, phone, shift };
}

export default connect(mapStateToProps, { 
	employeeUpdate, employeeSave
})(EmployeeEdit);
