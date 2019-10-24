import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, AsyncStorage } from 'react-native'
import ExpoConstants from 'expo-constants'
import Color from '../constants/Colors'

import { convertDate, convertToRupiah, TransactionAxios } from '../constants/Utilities'

import { Ionicons, FontAwesome } from '@expo/vector-icons'
function TransactionDetail(props) {
    const { transaction } = props.navigation.state.params;

    const deleteTransaction = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const { data } = await TransactionAxios({
                method: "DELETE",
                url: `/${transaction._id}`,
                headers: { token }
            })
            Alert.alert("Delete Data Success")
            props.navigation.goBack()
        } catch (error) {
            if (error.response.data.message)
                Alert.alert(error.response.data.message[0])
            else
                Alert.alert("Oppss.. something happend please reload")
        }
    }
    const handleDelete = () => {
        Alert.alert(
            'Are you sure?',
            'You won\'t be able to revert this!',
            [
                {
                    text: 'No! ',
                    style: 'cancel',
                },
                { text: "Yes!", onPress: deleteTransaction },
            ],
            { cancelable: false },
        );
    }
    const handleEdit = () => {
        props.navigation.navigate('Edit', { transaction })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: 30 }}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingVertical: 5, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons name="ios-arrow-back" size={40} color="white" /></TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete}><FontAwesome name="trash-o" size={35} color="white" /></TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                        <Image
                            style={{ width: 300, height: 300 }}
                            source={require('../assets/images/money.png')}
                        />

                        {/* <Text>uid {transaction.userId} </Text> */}

                        <Text style={styles.tip}>Purchased on: </Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 40 }}>
                            <Text style={styles.date}>{convertDate(transaction.date)}  </Text>
                            <TouchableOpacity onPress={handleEdit}><FontAwesome name="pencil-square-o" size={25} color="white" /></TouchableOpacity>
                        </View>
                    </View>

                    {transaction.items.map((item, index) => {
                        return (
                            <View key={index} style={styles.itemContainer}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingTop: 10 }}>
                                    <Text style={styles.itemPrice}>{item.qty} x Rp{convertToRupiah(item.price)}</Text>
                                    <Text>Subtotal : Rp{convertToRupiah(item.price * item.qty)}</Text>
                                </View>
                            </View >
                        )
                    })}
                    <Text style={styles.big}>Total : Rp{convertToRupiah(transaction.total)} </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: ExpoConstants.statusBarHeight,
        flex: 1,
        backgroundColor: Color.mainColor,
        paddingHorizontal: 20,
    },
    big: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "right",
        marginTop: 20
    },
    date: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    tip: {
        fontSize: 15,
        color: "white"
    },
    itemContainer: {
        width: "100%",
        padding: 12,
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginVertical: 10
    },
    itemName: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "capitalize"
    }
})
export default TransactionDetail