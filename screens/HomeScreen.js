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
    ImageBackground,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import UserBar from '../components/userBar';
import PointBar from '../components/pointBar';
import Constants from 'expo-constants'
import { UserAxios } from '../constants/Utilities'
import GreetBar from '../components/greetBar';
import EditProfile from './editProfile';

function HomeScreen(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user);
    async function getUser() {
        const token = await AsyncStorage.getItem('token')
        const { data } = await UserAxios({
            url: "/",
            method: "GET",
            headers: { token }
        })
        await dispatch(setUser(data))
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
                <GreetBar user={user} />
                <PointBar point={user.point} />
                <UserBar user={user} />
                <View style={{ height: 200, width: "100%", borderRadius: 5 }}>
                    <ScrollView nestedScrollEnabled={true} horizontal={false} style={{ height: "100%", width: "100%", paddingHorizontal: 20, borderRadius: 5 }} showsHorizontalScrollIndicator={false}>
                        <ImageBackground source={require('../assets/images/ads3.png')} style={styles.adsCard}>

                        </ImageBackground>
                        <ImageBackground source={require('../assets/images/ads2.jpg')} style={styles.adsCard}>

                        </ImageBackground>
                    </ScrollView>
                </View>
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
    adsBar: {
        marginBottom: 0,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adsCard: {
        backgroundColor: 'salmon',
        width: Dimensions.get('window').width - 40,
        height: 200,
        marginRight: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    }
});

// export default HomeScreen;

export default createStackNavigator({
    HomeScreen,
    EditProfile
})
