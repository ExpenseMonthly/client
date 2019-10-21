import React, { useEffect } from 'react';
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus, setUser } from '../redux/actions'
import Loading from '../components/Loading'
=======
import { useDispatch } from 'react-redux'
import { setLoginStatus, setUser } from '../redux/actions'
>>>>>>> 05ccfb3c1ff6d462ac58e5dc9f1ce2dba27e483b
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import UserBar from '../components/userBar';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { UserAxios } from '../constants/Utilities'
export default function HomeScreen(props) {
    const dispatch = useDispatch()
<<<<<<< HEAD
    const user = useSelector(state => state.user.user)
    async function getUser() {
        const token = await AsyncStorage.getItem('token')
        const { data } = await UserAxios({
            url: "/",
            method: "GET",
            headers: { token }
        })
        await dispatch(setUser(data))

=======
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
>>>>>>> 05ccfb3c1ff6d462ac58e5dc9f1ce2dba27e483b
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
        getUser()
        props.navigation.addListener(
            'didFocus',
            payload => {
                getUser()
            }
        )
    }, [])
    if (!user) return <Loading />
    else
        return (
            <View style={styles.container}>
                <View style={styles.pointBar}>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: "space-around", alignItems: 'center' }}>
                        <Image source={require('../assets/images/coin.png')} style={{ width: 50, height: 50 }}></Image>
                        <Text style={{ fontSize: 45, fontWeight: 'bold' }}>{user.point}</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#de8900', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <View>
                            <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>Playgame</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <UserBar user={user} />
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
        backgroundColor: '#2ec79c',
    },
    pointBar: {
        margin: 20,
        marginBottom: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
