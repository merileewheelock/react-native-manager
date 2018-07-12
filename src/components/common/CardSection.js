import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={[styles.containerStyle, props.style]}>
			{props.children}
		</View>
	);
};
// because we need to overwrite the style for flexDirection (with picker),
// we need to add props.style. In this array, the style on the right (props.style)
// will overwrite the style on the left (styles.container)

const styles = {
	containerStyle: {
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative'
	}
};

export { CardSection };
