import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

// this router will be the top level component inside the app
// react-native-router-flux must have one parent/root Scene
const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>
				<Scene key="auth">
					<Scene key="login" component={LoginForm} title="Please Login" initial />
				</Scene>
				<Scene key="main">
					<Scene key="employeeList" component={EmployeeList} title="Employees" />
					{/*<Scene key="employeeDetail" />*/}
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;