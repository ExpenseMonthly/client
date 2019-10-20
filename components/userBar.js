import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
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
import { FontAwesome } from '@expo/vector-icons';

export default function userBar(props) {
    const [name, setName] = useState('');
    async function getUser() {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const name = user.name.split(" ");
        console.log(name , 'name')
        let result = '';
        name.forEach((word, index) => {
            if(index == 0){
                result += word
            }else if(index == 1){
                result += ' '+word 
            }else{
                result += " "+word[0].toUpperCase()+"."
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
                <Text style={{ fontSize: 20, fontWeight: "bold", borderBottomColor: '#2ec79c', borderBottomWidth: 3 }}>
                {name}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="cog" size={15} />
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 5 }}>Profile Settings</Text>
                </TouchableOpacity>
            </View>
            <View>
                {/* <Image source={require('../assets/images/male.png')}></Image> */}
                <Image source={require('../assets/images/female.png')}></Image>
            </View>
        </View>
    )
}


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
