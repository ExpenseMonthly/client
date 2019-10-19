import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Color from '../constants/Colors'
import Constants from 'expo-constants'
export default function LoginScreen(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={{ padding: 20 }}>
                <Text style={styles.logo} >FinTrace</Text>
                <Text style={styles.logoWord} >Your Transaction Solution</Text>
            </View>
            <View style={styles.loginForm}>
                <TextInput
                    style={styles.inputText}
                    placeholder={"Your Name"}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={"johnDoe@email.com"}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={"Your Password"}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={"Retype Password"}
                    onChangeText={text => setRePassword(text)}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Register</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Text style={{ color: "white" }}>Already have account? </Text>
                    <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => { props.navigation.navigate('Login') }}>
                        <Text style={{ color: "blue", textTransform: "uppercase" }}>LOGIN</Text>
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