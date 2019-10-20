import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setLoginStatus } from '../redux/actions'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants'

export default function HomeScreen(props) {
    const dispatch = useDispatch()
    async function getToken() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user')
            console.log(user, " <<<<< USER ")
            console.log(token, " <<<<< TOKEN")
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
            <View style={styles.userBox}>
                <View style={{ justifyContent: 'space-between', width: "70%", height: 90 }}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", borderBottomColor: '#2ec79c', borderBottomWidth: 3 }}>Admin</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="cog" size={15} />
                        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 5 }}>Profile Settings</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image source={require('../assets/images/male.png')}></Image>
                </View>
                {/* <Image source={require('../assets/images/female.png')}></Image> */}
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
        backgroundColor: '#2ec79c',
    },
    userBox: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
