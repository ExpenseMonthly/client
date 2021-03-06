import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Modal, TextInput, AsyncStorage, Alert, Image, KeyboardAvoidingView } from 'react-native'
import Color from '../constants/Colors'
import ExpoConstant from 'expo-constants'
import Loading from '../components/Loading'
import { convertToRupiah, convertDate, TransactionAxios } from '../constants/Utilities'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import * as _ from 'lodash'
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from "react-native-modal-datetime-picker";

export default (props) => {
    const [transaction, setTransaction] = useState(props.navigation.state.params.data);
    const [modalVisible, setModalVisible] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemQty, setItemQty] = useState(null)
    const [itemPrice, setItemPrice] = useState(0)
    const [itemIndex, setItemIndex] = useState(-1)
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

    const showDateTimePicker = () => {
        setIsDateTimePickerVisible(true)
    };

    const hideDateTimePicker = () => {
        setIsDateTimePickerVisible(false)
    };

    const setEditItem = (index) => {
        setItemName(transaction.items[index].name)
        setItemQty(String(transaction.items[index].qty))
        setItemPrice(String(transaction.items[index].price))
        setItemIndex(index)
    }

    const handleDatePicked = date => {
        console.log("A date has been picked: ", date);

        setTransaction({
            ...transaction,
            date
        })

        hideDateTimePicker();
    };

    const editItem = (index) => () => {
        // let newTransaction = _.cloneDeep(transaction)
        // setEditTransaction(newTransaction)
        // newTransaction.items[index].name = "GANTI"
        setEditItem(index)
        setModalVisible(true)

        // setTransaction(newTransaction)
    }

    const handleSave = () => {
        let newTransaction = _.cloneDeep(transaction)
        
        if(itemIndex > -1) {
            newTransaction.items[itemIndex].name = itemName
            newTransaction.items[itemIndex].qty = itemQty
            newTransaction.items[itemIndex].price = itemPrice
        } else {
            newTransaction.items.push({
                name: itemName,
                qty: itemQty,
                price: itemPrice
            })
        }
        
        setTransaction(newTransaction)
        setModalVisible(false)
    }

    const deleteItem = (index) => () => {
        let newTransaction = _.cloneDeep(transaction)
        newTransaction.items.splice(index, 1)

        setTransaction(newTransaction)
    }

    const reset = () => {
        setTransaction(props.navigation.state.params.data)
    }

    const save = async () => {
        if(!transaction.date) {
            Alert.alert("Date not valid!")            
        } else {
            try {
                const token = await AsyncStorage.getItem('token');
                const { data } = await TransactionAxios({
                    method: "POST",
                    url: `/receipt`,
                    headers: { token },
                    data: transaction
                });
    
                Alert.alert("Update Success", "Your data successfully updated!")
                props.navigation.goBack()
            } catch (error) {
                if (error.response.data.message)
                    Alert.alert(error.response.data.message[0])
                else
                    Alert.alert("Opps.. something gone wrong! please reload")
                console.log(error.response)
            }
        }
    }

    const add = () => {
        setItemIndex(-1)
        setItemName('')
        setItemQty('')
        setItemPrice('')

        setModalVisible(true)
    }

    if (!transaction) return <Loading />
    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}><Ionicons name="ios-arrow-back" size={40} color="white" /></TouchableOpacity>
                    <Text style={styles.tip}>Purchased on: </Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 40 }}>
                    <TouchableOpacity title="Show DatePicker" onPress={showDateTimePicker}>
                        <Text style={styles.date}>{convertDate(transaction.date)}  </Text>
                    </TouchableOpacity>
                    </View>
                    {transaction.items.map((item, index) => {
                        return (
                            <View style={styles.editBox} key={index}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.qty}>Qty : {item.qty}</Text>
                                <Text style={styles.price}>Rp {convertToRupiah(item.price)}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                    <TouchableOpacity onPress={editItem(index)} style={styles.editButton}><FontAwesome name="edit" size={20} /></TouchableOpacity>
                                    <TouchableOpacity onPress={deleteItem(index)} style={styles.deleteButton}><FontAwesome name="trash" size={20} /></TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", height: 50, alignItems: "center" }}>
                        <TouchableOpacity onPress={reset} style={styles.button}><FontAwesome name="undo" size={30} color="white" /></TouchableOpacity>
                        <TouchableOpacity onPress={add} style={styles.button}><FontAwesome name="plus" size={30} color="white" /></TouchableOpacity>
                        <TouchableOpacity onPress={save} style={styles.button}><FontAwesome name="save" size={30} color="white" /></TouchableOpacity>
                    </View>
                </ScrollView>
                
                <DateTimePicker
                    isVisible={isDateTimePickerVisible}
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                />
            </View >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={{ width: "100%", height: "100%", backgroundColor: "black", opacity: 0.5 }} onPress={() => setModalVisible(false)} />
                    <KeyboardAvoidingView style={{ paddingTop: ExpoConstant.statusBarHeight, position: "absolute", width: '90%', height: "70%", backgroundColor: "white", borderRadius: 10, marginLeft: 20 }} >
                        <ScrollView showVerticalScrollIndicator={false}>

                            <View style={{ justifyContent: "center", alignItems: "center" }}>

                                <Text style={styles.header}>Edit Transaction</Text>
                                <Image
                                    style={{ width: 300, height: 300 }}
                                    source={require('../assets/images/edit.png')}
                                />
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setItemName(text)}
                                value={itemName}
                                placeholder="item name"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setItemQty(text)}
                                value={itemQty}
                                placeholder="item qty"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setItemPrice(text)}
                                value={String(itemPrice)}
                                placeholder="item price"
                            />
                            <TouchableHighlight onPress={handleSave} style={styles.submitButton}>
                                <Text style={{ fontSize: 20, color: "white" }}>Look's Good</Text>
                            </TouchableHighlight>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: ExpoConstant.statusBarHeight,
        flex: 1,
        backgroundColor: Color.mainColor,
        paddingHorizontal: 20
    },
    editBox: {
        width: "100%",
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
        marginVertical: 10,
        padding: 10
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    date: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    tip: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        marginTop: 20
    },
    editButton: {
        padding: 10,
    },
    deleteButton: {
        padding: 10
    },
    input: {
        backgroundColor: Color.mainColor,
        justifyContent: "center",
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: "white"
    },
    header: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: Color.mainColor
    },
    submitButton: {
        // position: "absolute",
        // bottom: 0,
        width: "100%",
        backgroundColor: Color.mainColor,
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }

})