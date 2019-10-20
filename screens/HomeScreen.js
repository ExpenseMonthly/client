import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setLoginStatus } from '../redux/actions'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity
} from 'react-native';

import Constants from 'expo-constants'

export default function HomeScreen(props) {
    const dispatch = useDispatch()
    async function getToken() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user')
            // console.log(user, " <<<<< USER ")
            // console.log(token, " <<<<< TOKEN")
        } catch (error) {
            console.log(error)
        }
    }
    const removeToken = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            await AsyncStorage.multiRemove(keys)
            await dispatch(setLoginStatus(false))
            props.navigation.navigate('Login')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity onPress={removeToken}><Text>Logout</Text></TouchableOpacity>
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
    },
});
