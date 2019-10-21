import React, { useEffect, useState, useRef } from 'react';
import CodeInput from 'react-native-confirmation-code-field';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import Loading from '../components/Loading'
import ExpoConstants from 'expo-constants'
import Color from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
function GameScreen(props) {
    const [number, setNumber] = useState(null)
    const [show, setShow] = useState(false)
    const [timer, setTimer] = useState(5)
    const [answer, setAnswer] = useState('0000')
    const field = useRef()
    const handlerOnFulfill = code => {
        console.log(code);
        const { current } = field
        current.clear()
    };

    const handlePlay = () => {
        setShow(true)
    }
    useEffect(() => {
        props.navigation.addListener(
            'didFocus',
            payload => {
                const randomNumber = Math.floor(Math.random() * 10000 + 9999)
                setNumber(randomNumber)
            }
        )
    }, [])

    if (!number) return <Loading />
    else
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons name="ios-arrow-back" size={40} color="white" /></TouchableOpacity>
                <View style={styles.gameContainer}>
                    {show && <Text style={styles.number}>{number}</Text>}
                    <TouchableOpacity onPress={handlePlay}><Text>Play</Text></TouchableOpacity>
                </View>

                <CodeInput ref={field} onFulfill={handlerOnFulfill} />

                <TextInput
                    style={styles.input}
                    onChangeText={text => setAnswer(text)}
                    value={answer}
                    keyboardType="numeric"
                />


            </KeyboardAvoidingView>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: ExpoConstants.statusBarHeight,
        backgroundColor: Color.mainColor,
        paddingHorizontal: 20
    },
    gameContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    number: {
        fontSize: 80,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})

export default GameScreen