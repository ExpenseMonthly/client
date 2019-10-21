import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
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
import ExpoConstants from 'expo-constants';
import Color from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

function EditProfile(props) {
    const dispatch = useDispatch();
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
    const user = useSelector(state => state.user.user);
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image style={styles.image} source={require('../assets/images/male.png')}></Image>
                <View style={styles.infoBox}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={styles.infoBlock}>
                            <Text style={styles.fieldTitle}>Name</Text>
                            <Text style={styles.fieldValue}>{user.name}</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.fieldTitle}>Email</Text>
                            <Text style={styles.fieldValue}>{user.email}</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.fieldTitle}>Gender</Text>
                            <Text style={styles.fieldValue}>{user.gender}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}
                        onPress={() => console.log(`aaaaa`)}>
                        <FontAwesome name="edit" size={15} />
                        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 5 }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                backgroundColor: '#ff4f4f',
                width: '100%',
                marginTop: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 5
            }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}
                    onPress={removeToken}>
                    <FontAwesome name="sign-out" size={15} color={'white'} />
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 5, color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: ExpoConstants.statusBarHeight,
        backgroundColor: Color.mainColor,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    userInfo: {
        width: '100%',
        alignItems: 'center',
    },
    infoBox: {
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 5
    },
    image: {
        width: 150,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fieldTitle: {
        fontWeight: 'bold'
    },
    fieldValue: {

    },
    infoBlock: {
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomColor: 'whitesmoke',
        borderBottomWidth: 2
    }
})

export default EditProfile;