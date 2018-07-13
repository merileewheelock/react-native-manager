import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
	state = { showModal: false }
	// can do component level state bc rest of app doesn't need to know about modal

	componentWillMount() {
		// want to take all the props of employee and send to reducer
		// need lodash to iterate over all props of employee. prop is the key of the key-value pair
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, phone, shift } = this.props;
		// console.log(name, phone, shift); // coming from form reducer

		// when a user comes to employee edit, they have clicked on a name wiht a unique uid
		// this calls event handler of ListItem, which transitions to employeeEdit,
		// which passes employee as a prop
		this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid })
	}

	onTextPress() {
		const { phone, shift } = this.props;

		Communications.text(phone, `Your upcoming shift is on ${shift}.`);
	}

	onAccept() {
		const { uid } = this.props.employee;

		this.props.employeeDelete({ uid });
	}

	onDecline() {
		this.setState({ showModal: false });
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

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Fire Employee
					</Button>
				</CardSection>

				<Confirm
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>
					Are you sure you want to delete this?
				</Confirm>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, phone, shift } = state.employeeForm;

	return { name, phone, shift };
}

export default connect(mapStateToProps, { 
	employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);
