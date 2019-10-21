import React, { useEffect, useState, useRef } from 'react';
import CodeInput from 'react-native-confirmation-code-field';

import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import Loading from '../components/Loading'
import ExpoConstants from 'expo-constants'
import Color from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
function GameScreen(props) {
    const [number, setNumber] = useState(null)
    const [show, setShow] = useState(false)
    const [moveLeft, setMoveLeft] = useState(3)
    const [finished, setFinished] = useState(false)
    const [trueAnswer, setTrueAnswer] = useState(0)
    const field = useRef()
    const handlerOnFulfill = code => {
        if (code == number) {
            Alert.alert('Nice one!')
            setTrueAnswer(trueAnswer + 1)
        } else {
            Alert.alert('Wrong answer! XD')
        }

        setMoveLeft(moveLeft - 1)
        setShow(false)
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
    useEffect(() => {
        if (moveLeft <= 0) {
            setFinished(true)
            Alert.alert("Game Finsihed");
            props.navigation.goBack()
        }
    }, [moveLeft])

    if (!number) return <Loading />
    else
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons name="ios-arrow-back" size={40} color="white" /></TouchableOpacity>
                <Text>Move Left {moveLeft}</Text>
                <Text>True Answer {trueAnswer}</Text>
                <Text>Game status {finished ? "finished" : "playing"}</Text>
                <View style={styles.gameContainer}>
                    {show && <Text style={styles.number}>{number}</Text>}
                    {show ?
                        <CodeInput ref={field} onFulfill={handlerOnFulfill} /> :
                        <TouchableOpacity onPress={handlePlay}><Text>Play</Text></TouchableOpacity>
                    }
                </View>



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