import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

// this router will be the top level component inside the app
// react-native-router-flux must have one parent/root Scene
const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root">
				<Scene key="login" component={LoginForm} title="Please Login" />
			</Scene>
		</Router>
	);
};

export default RouterComponent;