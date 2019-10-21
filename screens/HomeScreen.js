import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus, setUser } from '../redux/actions'
import Loading from '../components/Loading'
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
    const user = useSelector(state => state.user.user)
    async function getUser() {
        const token = await AsyncStorage.getItem('token')
        const { data } = await UserAxios({
            url: "/",
            method: "GET",
            headers: { token }
        })
        await dispatch(setUser(data))

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
