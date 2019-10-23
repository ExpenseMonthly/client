import React, { useEffect, useState, useRef } from 'react';
import CodeInput from 'react-native-confirmation-code-field';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native'
import Loading from '../components/Loading'
import ExpoConstants from 'expo-constants'
import Color from '../constants/Colors'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { Updates } from 'expo';
function GameScreen(props) {
    const COUNTER = 2
    const [number, setNumber] = useState(null)
    const [code, setCode] = useState(null)
    const [show, setShow] = useState({ number: false, input: false, playButton: true })
    const [moveLeft, setMoveLeft] = useState(3)
    // const [finished, setFinished] = useState(false)
    const [trueAnswer, setTrueAnswer] = useState(0)
    const [counter, setCounter] = useState(COUNTER)
    // const [isPlaying, setIsPlaying] = useState(false)
    const field = useRef()

    const gotoHome = () => {
        props.navigation.goBack()
    }

    const handlerOnFulfill = code => {
        setCode(code)
        setMoveLeft(moveLeft - 1)
        if (code == number) {
            // if (trueAnswer + 1 == 1) {
            //     console.log("BENER 1")
            // } else if (trueAnswer + 1 == 2) {
            //     console.log("BENER2")
            // } else if (trueAnswer + 1 == 3) {
            //     console.log("BENER3")
            // }
            setTrueAnswer(trueAnswer + 1)
            Alert.alert('Nice one!', "", [{ text: 'OK', onPress: checkScore }])
        } else {
            Alert.alert('Wrong answer! XD', "", [{ text: 'oke', onPress: checkScore }])
        }
        setShow({ playButton: true, number: false, input: false })
        field.current.clear()
    };

    const givePoint = (points) => {
        if (points == 0) {
            Alert.alert('Sorry no points for you', "", [{ text: 'Ok', onPress: gotoHome }])
        } else if (points == undefined) {
            updatePoint(5);
        } else if (points == 5) {
            updatePoint(10);
        } else if (points == 10) {
            updatePoint(20);
        }
    }

    const updatePoint = (point) => {
        AsyncStorage.getItem('token')
            .then(token => {
                axios({
                    url: 'http://34.87.56.56/users/point',
                    method: 'patch',
                    headers: {
                        token
                    },
                    data: {
                        point
                    }
                })
                    .then(({ data }) => {
                        Alert.alert(`Congratulation you got ${point} points`, "", [{ text: 'Ok', onPress: gotoHome }]);
                    })
                    .catch(console.log);
            })
    }

    const checkScore = () => {
        // console.log(moveLeft);
        if (moveLeft <= 1) {
            if (trueAnswer == 0) {
                givePoint();
            } else if (trueAnswer == 1) {
                givePoint(5);
            } else if (trueAnswer == 2) {
                givePoint(10);
            } else if (trueAnswer == 3) {
                givePoint(15);
            }
        } else {
            console.log(`keep playing`);
        }
    }

    const handlePlay = () => {
        setRandomNumber()
        setShow({ playButton: false, number: true, input: false })
        setCounter(COUNTER)

        if (field.current) {
            field.current.focus()
        }

        let timer = setInterval(() => {
            setCounter(counter => {
                let newCounter = counter - 1
                if (newCounter <= 0) {
                    clearInterval(timer)
                    setShow({ playButton: false, number: false, input: true })
                }
                return newCounter
            })
        }, 1000)
    }

    const setRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 10000 + 9999)
        setNumber(randomNumber)
    }
    useEffect(() => {
        props.navigation.addListener(
            'didFocus',
            payload => {
                setRandomNumber()
            }
        )
    }, [])


    if (!number) return <Loading />
    else
        return (

            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons name="ios-arrow-back" size={40} color="white" /></TouchableOpacity>
                <View style={styles.gameContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#fff' }}>Test Your Memory !</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{moveLeft} Move Remaining</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>True Answer : {trueAnswer}</Text>
                    <View style={styles.gameContainer}>
                        {show.number && (
                            <View style={styles.randomNumberContainer}>
                                <Text>{counter} second remaining</Text>
                                <Text style={styles.number}>{number}</Text>
                            </View>
                        )}
                        {!show.number && (
                            <View style={styles.randomNumberContainer}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff', marginBottom: 30 }}>Ready? You only got 3 second to remember the number</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ paddingHorizontal: 8 }}>
                                        <FontAwesome name="lock" size={60} />
                                    </View>
                                    <View style={{ paddingHorizontal: 8 }}>
                                        <FontAwesome name="lock" size={60} />
                                    </View>
                                    <View style={{ paddingHorizontal: 8 }}>
                                        <FontAwesome name="lock" size={60} />
                                    </View>
                                    <View style={{ paddingHorizontal: 8 }}>
                                        <FontAwesome name="lock" size={60} />
                                    </View>
                                    <View style={{ paddingHorizontal: 8 }}>
                                        <FontAwesome name="lock" size={60} />
                                    </View>
                                </View>
                            </ View>
                        )}
                        {show.input && <CodeInput autoFocus={true} ref={field} onFulfill={handlerOnFulfill} />}
                        {show.playButton && <TouchableOpacity style={styles.playButton} onPress={handlePlay}><Text style={{ textTransform: "uppercase", color: "white", fontSize: 40, fontWeight: "bold" }}>Play</Text></TouchableOpacity>}
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: ExpoConstants.statusBarHeight,
        backgroundColor: Color.mainColor,
        paddingHorizontal: 20,
    },
    gameContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    number: {
        fontSize: 80,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    playButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "orange",
        borderRadius: 5,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    randomNumberContainer: {
        height: 400,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default GameScreen