import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setLoginStatus } from '../redux/actions'
// import { API } from 'react-native-dotenv'
import moment from 'moment';
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
    let date = moment()
        .utcOffset('+07:00')
        .format('YYYY-MM-DD');
    let time = moment()
        .utcOffset('+07:00')
        .format('HH');
    date = (new Date(date)).toDateString().split(' ');
    return (
        <View style={styles.greetBar}>
            {(Number(time) >= 5 && Number(time) < 11) &&
                <ImageBackground
                    source={require('../assets/images/morning.png')}
                    style={styles.greetCard}
                    blurRadius={1}>
                    <Text style={styles.greetDate}>{`${date[0]}, ${date[2]} ${date[1]} ${date[3]}`}</Text>
                    <Text style={styles.greetWord}>{`Good Morning, ${props.user.name.split(' ')[0]}`}</Text>
                </ImageBackground>
            }
            {(Number(time) >= 11 && Number(time) < 16) &&
                <ImageBackground
                    source={require('../assets/images/afternoon.png')}
                    style={styles.greetCard}
                    blurRadius={1}>
                    <Text style={styles.greetDate}>{`${date[0]}, ${date[2]} ${date[1]} ${date[3]}`}</Text>
                    <Text style={styles.greetWord}>{`Good Afternoon, ${props.user.name.split(' ')[0]}`}</Text>
                </ImageBackground>
            }
            {(Number(time) >= 16 && Number(time) < 18) &&
                <ImageBackground
                    source={require('../assets/images/evening.png')}
                    style={styles.greetCard}
                    blurRadius={1}>
                    <Text style={styles.greetDate}>{`${date[0]}, ${date[2]} ${date[1]} ${date[3]}`}</Text>
                    <Text style={styles.greetWord}>{`Good Evening, ${props.user.name.split(' ')[0]}`}</Text>
                </ImageBackground>
            }
            {(Number(time) >= 18 && Number(time) < 24) &&
                <ImageBackground
                    source={require('../assets/images/night.png')}
                    style={styles.greetCard}
                    blurRadius={1}>
                    <Text style={styles.greetDate}>{`${date[0]}, ${date[2]} ${date[1]} ${date[3]}`}</Text>
                    <Text style={styles.greetWord}>{`Good Night, ${props.user.name.split(' ')[0]}`}</Text>
                </ImageBackground>
            }
            {(Number(time) >= 0 && Number(time) < 5) &&
                <ImageBackground
                    source={require('../assets/images/night.png')}
                    style={styles.greetCard}
                    blurRadius={1}>
                    <Text style={styles.greetDate}>{`${date[0]}, ${date[2]} ${date[1]} ${date[3]}`}</Text>
                    <Text style={styles.greetWord}>{`Good Night, ${props.user.name.split(' ')[0]}`}</Text>
                </ImageBackground>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    greetBar: {
        width: '100%',
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    greetCard: {
        backgroundColor: '#6cdef0',
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greetDate: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    greetWord: {
        fontSize: 12,
        color: '#fff'
    }
})