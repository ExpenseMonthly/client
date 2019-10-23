import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus } from '../redux/actions'
import { API } from 'react-native-dotenv'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

export default withNavigation((props) => {
    const [name , setName ] = useState();
    // const user = useSelector(state => state.user.user);
    async function getUser() {
        const user = props.user
        const name = user.name.split(" ");
        let result = '';
        name.forEach((word, index) => {
            if (index == 0) {
                result += word
            } else if (index == 1) {
                result += ' ' + word
            } else {
                result += " " + word[0].toUpperCase() + "."
            }
        })
        setName(result);
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <View style={styles.userBox}>
            <View style={{ justifyContent: 'space-between', width: "70%", height: 90 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", borderBottomColor: '#2ec79c', borderBottomWidth: 3, textTransform: "capitalize" }}>
                    {name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }} onPress={() => props.navigation.navigate('VoucherUser')}>
                        <FontAwesome name="ticket" size={12} />
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 5 }}>Vouchers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => props.navigation.navigate('Profile')}>
                        <FontAwesome name="cog" size={12} />
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 5 }}>Profile Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {props.user.gender == 'male' &&
                    <Image source={require('../assets/images/male.png')}></Image>
                }
                {props.user.gender == 'female' &&
                    <Image source={require('../assets/images/female.png')}></Image>
                }
            </View>
        </View>
    )
})


const styles = StyleSheet.create({
    userBox: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
