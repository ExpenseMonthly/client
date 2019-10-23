import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation'
import { functionTypeAnnotation } from '@babel/types';
import axios from 'axios';

function updateScore() {
    AsyncStorage.getItem("token")
        .then(value => {
            const token = value;
            const point = -5;
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
                })
                .catch(console.log);
        })
        .catch(err => {
            console.log(err);
        })

}

function PointBar(props) {
    const gotogame1 = () => {
        if (props.point < 5) {
            Alert.alert(`Sorry you need at least 5 point to play game`, "", [{ text: 'Ok' }])
        } else {
            updateScore();
            props.navigation.navigate('Game1');
        }
    }
    const gotogame2 = () => {
        if (props.point < 5) {
            Alert.alert(`Sorry you need at least 5 point to play game`, "", [{ text: 'Ok' }])
        } else {
            updateScore();
            props.navigation.navigate('Game2');
        }
    }
    return (
        <View style={styles.pointBar}>
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: "space-around", alignItems: 'center' }}>
                <Image source={require('../assets/images/coin.png')} style={{ width: 50, height: 50 }}></Image>
                <Text style={{ fontSize: 45, fontWeight: 'bold' }}>{props.point}</Text>
            </View>
            <View>
                <TouchableOpacity style={{ backgroundColor: '#614700', justifyContent: 'center', alignItems: 'center', padding: 10, borderTopRightRadius: 5 }} onPress={gotogame1} >
                    <View>
                        <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                            Remember Me
                    </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#de8900', justifyContent: 'center', alignItems: 'center', padding: 10, borderBottomRightRadius: 5 }} onPress={gotogame2} >
                    <View>
                        <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>
                            Wheel Spin
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    pointBar: {
        margin: 20,
        marginBottom: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
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

export default withNavigation(PointBar)