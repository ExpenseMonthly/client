import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Modal, TextInput } from 'react-native'
import Color from '../constants/Colors'
import ExpoConstant from 'expo-constants'
import Loading from '../components/Loading'
import { convertToRupiah, convertDate } from '../constants/Utilities'
import * as _ from 'lodash'
function EditScreen(props) {
    const [transaction, setTransaction] = useState(props.navigation.state.params.transaction);
    const [modalVisible, setModalVisible] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemQty, setItemQty] = useState(null)
    const [itemPrice, setItemPrice] = useState(0)
    const [itemIndex, setItemIndex] = useState(null)
    // const [editTransaction, setEditTransaction] = useState(null)

    const setEditItem = (index) => {
        setItemName(transaction.items[index].name)
        setItemQty(String(transaction.items[index].qty))
        setItemPrice(String(transaction.items[index].price))
        setItemIndex(index)
    }
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
        newTransaction.items[itemIndex].name = itemName
        newTransaction.items[itemIndex].qty = itemQty
        newTransaction.items[itemIndex].price = itemPrice
        setTransaction(newTransaction)

        setModalVisible(false)
    }
    const deleteItem = (index) => () => {
        let newTransaction = _.cloneDeep(transaction)
        newTransaction.items.splice(index, 1)

        setTransaction(newTransaction)
    }
    const reset = () => {
        setTransaction(props.navigation.state.params.transaction)
    }
    if (!transaction) return <Loading />
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.tip}>Purchased on: </Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: 40 }}>
                    <Text style={styles.date}>{convertDate(transaction.date)}  </Text>
                </View>
                {transaction.items.map((item, index) => {
                    return (
                        <View style={styles.editBox} key={index}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.qty}>Qty : {item.qty}</Text>
                            <Text style={styles.price}>Rp {convertToRupiah(item.price)}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <TouchableOpacity onPress={editItem(index)}><Text>Edit</Text></TouchableOpacity>
                                <TouchableOpacity onPress={deleteItem(index)}><Text>Delete</Text></TouchableOpacity>
                            </View>
                        </View>
                    )
                })}

                <TouchableOpacity onPress={reset} style={styles.resetButton}><Text>Reset</Text></TouchableOpacity>
            </View >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={{ width: "100%", height: "100%", backgroundColor: "black", opacity: 0.5 }} onPress={() => setModalVisible(false)} />
                    <View style={{ paddingTop: ExpoConstant.statusBarHeight, position: "absolute", width: '90%', height: "80%", backgroundColor: "white", borderRadius: 10, marginLeft: 20 }} >

                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => setItemName(text)}
                            value={itemName}
                            placeholder="item name"
                        />
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => setItemQty(text)}
                            value={itemQty}
                            placeholder="item qty"
                        />
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => setItemPrice(text)}
                            value={itemPrice}
                            placeholder="item price"
                        />
                        <TouchableHighlight onPress={handleSave}>
                            <Text>Look's Good</Text>
                        </TouchableHighlight>
                    </View>
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
    resetButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "green"
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
})
export default EditScreen