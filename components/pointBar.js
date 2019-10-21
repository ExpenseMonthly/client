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
    Image,
} from 'react-native';
import { withNavigation } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons';

function PointBar(props) {
    return (
        <View style={styles.pointBar}>
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: "space-around", alignItems: 'center' }}>
                <Image source={require('../assets/images/coin.png')} style={{ width: 50, height: 50 }}></Image>
                <Text style={{ fontSize: 45, fontWeight: 'bold' }}>99</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#de8900', justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={() => props.navigation.navigate('Game')} >
                <View>
                    <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>
                        Playgame
                    </Text>
                </View>
            </TouchableOpacity>
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