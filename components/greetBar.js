import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setLoginStatus } from '../redux/actions'
// import { API } from 'react-native-dotenv'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function greetBar(props) {
    return (
        <View style={styles.greetBar}>
            <ImageBackground style={styles.greetCard}>
                <Text style={styles.greetWord}>Good Morning, Firdaus</Text>
            </ImageBackground>
            {/* <ImageBackground style={styles.greetCard}>
                <Text style={styles.greetWord}>Good Morning, Firdaus</Text>
            </ImageBackground>
            <ImageBackground style={styles.greetCard}>
                <Text style={styles.greetWord}>Good Morning, Firdaus</Text>
            </ImageBackground>
            <ImageBackground style={styles.greetCard}>
                <Text style={styles.greetWord}>Good Morning, Firdaus</Text>
            </ImageBackground> */}
        </View>
    );
};

const styles = StyleSheet.create({
    greetBar: {
        width: '100%',
        height: 70,
    },
    greetCard: {
        backgroundColor: '#6cdef0',
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greetWord: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    }
})