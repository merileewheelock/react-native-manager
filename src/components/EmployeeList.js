import _ from 'lodash';
import React, { Component } from 'react';
import{ connect } from 'react-redux';
import { FlatList, ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
	componentWillMount() {
		// as soon as component is about to be rendered, will get list of employees
		// this.props.employeesFetch();

		// this.createDataSource(this.props);
		this.createDataSource();
	}

	// componentWillReceiveProps(nextProps) {
	// 	// gets called with new set of props that the component is about to get
	// 	// nextProps are the next set of props that this component will be rendered with
	// 	// this.props is still the old set of props
	// 	// good method for reacting to any change in the props object
		
	// 	this.createDataSource(nextProps);
	// }

	// createDataSource({ employees }) {
	// 	// we want to build the data source both when the component loads when when it received new props
	// 	const ds = new ListView.DataSource({
	// 		rowHasChanged: (r1, r2) => r1 !== r2
	// 	});

	// 	// cloneWithRows does not know how to work with an object
	// 	// wants an array. employees is an object
	// 	// using lodash to help with conversion from object -> array
	// 	this.dataSource = ds.cloneWithRows(employees);
	// }

	createDataSource() {
		this.props.employeesFetch();
	}

	renderRow(employee) {
		// console.log(employee.item)
		return <ListItem employee={employee} />;
	}

	render() {
		return (
			<FlatList
				data={this.props.employees}
				renderItem={this.renderRow}
				keyExtractor={employee => employee.uid}
			/>
		);
	}

	// render() {
	// 	return(
	// 		<ListView
	// 			enableEmptySections
	// 			dataSource={this.dataSource}
	// 			renderRow={this.renderRow}
	// 		/>
	// 	);
	// }
}

const mapStateToProps = state => {
	// console.log(state.employees)
	// below, uid is the key of value
	// state.employees is an object with many key-value pairs
	// for each key-valeue pair, run fat arrow function
	// function will be called with each value and key
	// key is the id of the record. val is the user model (name, phone, shift)
	// create new object and push in all the values from the user model, add id
	// { shift: 'Monday', name: 'S', id '1j2k3l4' } -> map puts in array
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid };
	});

	// console.log({ employees })
	return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
