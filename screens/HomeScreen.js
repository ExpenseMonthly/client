import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setLoginStatus, setUser } from '../redux/actions'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import UserBar from '../components/userBar';
import PointBar from '../components/pointBar';
import Constants from 'expo-constants'
import GreetBar from '../components/greetBar';
import EditProfile from './editProfile';

function HomeScreen(props) {
    const dispatch = useDispatch()
    async function getToken() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user')
            await dispatch(setUser(JSON.parse(user)))
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
        // console.log(API)'
        getToken()
    }, [])

    return (
        <View style={styles.container}>
            <GreetBar />
            <PointBar />
            <UserBar />
            <View style={styles.adsBar}>
                <ImageBackground style={styles.adsCard}>

                </ImageBackground>
            </View>
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
    adsBar: {
        marginBottom: 0,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adsCard: {
        backgroundColor: 'salmon',
        width: '100%',
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 5,
    }
});

// export default HomeScreen;

export default createStackNavigator({
    HomeScreen,
    EditProfile
})