import React from 'react';
import { Text } from 'react-native';

export default (props) => {
    console.log(props.navigation.state.params.data, 'ini')
    return <Text>{JSON.stringify(props.navigation.state.params.data, null, 2)}</Text>
}