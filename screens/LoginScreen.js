import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus } from '../redux/actions'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native'
import Color from '../constants/Colors'
import Constants from 'expo-constants'
import { UserAxios } from '../constants/Utilities'

export default function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.user.isLogin)


    useEffect(() => {
        if (isLogin) {
            console.log(isLogin, "HOME")
            props.navigation.navigate('Main')
        }
    }, [])

    const handleLogin = async () => {
        try {
            await setLoading(true)
            const { data } = await UserAxios({
                url: "/login",
                method: "POST",
                data: {
                    email,
                    password
                }
            })
            await AsyncStorage.setItem("token", data.token)
            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await setLoading(false)

            await dispatch(setLoginStatus(true))

            props.navigation.navigate('Main')

        } catch (err) {
            if (err.response)
                console.log(err.response)
            else
                console.log(err)
            Alert.alert("Invalid Email/Password")
        }
    }
    if (loading) return <Text>Loading...</Text>
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={{ padding: 20 }}>
                <Text style={styles.logo} >FinTrace</Text>
                <Text style={styles.logoWord} >Your Transaction Solution</Text>
            </View>
            <View style={styles.loginForm}>
                <TextInput
                    style={styles.inputText}
                    placeholder={"JohnDoe@email.com"}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style={styles.inputText}
                    placeholder={"Your Password"}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
                    <Text style={styles.submitText}>LOGINs</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>OR</Text>
                    <View style={{ flexDirection: "row", paddingTop: 10 }}>
                        <Text style={{ color: "white" }}>Create a New </Text>
                        <Text style={{ fontWeight: "800", color: "white" }}>Account</Text>
                    </View>
                    <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => { props.navigation.navigate('Register') }}>
                        <Text style={{ color: "blue", textTransform: "uppercase" }}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.mainColor,
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        fontSize: 47,
        fontWeight: "900",
        color: "white",
        textTransform: "uppercase",
        width: "100%"
    },
    logoWord: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase"
    },
    inputText: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: "white",
        width: "100%",
        textAlign: "center",
        marginVertical: 10
    },
    loginForm: {
        width: "100%",
        padding: 30,
    },
    submitButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#0ba36d",
        borderRadius: 5
    },
    submitText: {
        color: "white",
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "500"
    }
})