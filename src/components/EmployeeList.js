import React, { Component } from 'react';
import{ connect } from 'react-redux';
import { View, Text } from 'react-native';
import { employeesFetch } from '../actions';

class EmployeeList extends Component {
	componentWillMount() {
		// as soon as component is about to be rendered, will get list of employees
		this.props.employeesFetch();
	}

	render() {
		return (
			<View>
				<Text>Employee List</Text>
				<Text>Employee List</Text>
				<Text>Employee List</Text>
				<Text>Employee List</Text>
				<Text>Employee List</Text>
			</View>
		);
	}
}

export default connect(null, { employeesFetch })(EmployeeList);