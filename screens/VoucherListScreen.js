import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native'
import ExpoConstants from 'expo-constants'
import Constants from '../constants/Colors'
import { convertDate } from '../constants/Utilities'
import Voucher from '../components/Voucher'
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { VoucherAxios } from '../constants/Utilities';

function VoucherListScreen(props) {

    let [vouchers, setVouchers] = useState(Array);
    
    const getVouchers = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const { data } = await VoucherAxios({
                url: '/',
                method: "GET",
                headers: { token }
            });

            setVouchers(data)
        } catch (error) {
            if (err.response.data)
                console.log(err.response.data)
            else
                console.log(err)
        }
    }
    
    useEffect(() => {
        getVouchers();
        
        props.navigation.addListener(
            'didFocus',
            payload => {
                getVouchers();                
            }
        )
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: "100%", height: "100%" }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons name="ios-arrow-back" size={40} color="white" /></TouchableOpacity>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Voucher List</Text>
                </View>
                {vouchers.map(voucher => {
                    return (
                        <TouchableOpacity key={voucher._id} style={{ width: "100%" }} onPress={() => props.navigation.navigate("VoucherDetail", { voucher })}>
                            <Voucher voucher={voucher} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: ExpoConstants.statusBarHeight,
        backgroundColor: Colors.mainColor,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    headerContainer: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    }
})

export default VoucherListScreen