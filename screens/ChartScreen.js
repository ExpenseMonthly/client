import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Modal, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import ExpoConstant from 'expo-constants';
import Constants from 'expo-constants';
import { TransactionAxios, convertToRupiah, convertDate, convertMonthYear } from '../constants/Utilities';
import Loading from '../components/Loading';
import {
    LineChart
} from "react-native-chart-kit";

export default function ScanScreen(props) {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('2019-10-01');
    const [endDate, setEndDate] = useState('2019-10-30');
    const [dataTransactions, setDataTransactions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)

    const changeDate = () => {
        setModalVisible(true)
    }
    
    const getTransactionRange = async () => {
        try {
            setLoading(true)
            const token = await AsyncStorage.getItem("token");
            const { data } = await TransactionAxios({
                url: `/findRange/${startDate}/${endDate}`,
                method: "GET",
                headers: { token }
            })
            setDataTransactions(data);
            setLoading(false)
        } catch (err) {
            if (err.response.data)
                console.log(err.response.data)
            else
                console.log(err)
        }
    }

    const handleViewMore = (transaction) => () => {
        props.navigation.navigate('TransactionDetail', { transaction })
    }

    useEffect(() => {
        props.navigation.addListener(
            'didFocus',
            payload => {
                getTransactionRange()
            }
        )
    }, [])

    useEffect(() => {
        getTransactionRange()
    }, [startDate, endDate])

    if (loading) return <Loading />

    return (
        <View style={[style.container, { paddingTop: Constants.statusBarHeight }]}>
            <View style={{ marginVertical: 12, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity title="Show DatePicker" onPress={() => changeDate()}>
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{convertMonthYear(startDate)}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ witdh: "100%", paddingHorizontal: 20, justifyContent: "center", alignContent: "center" }}>

                <LineChart
                    data={{
                        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 1000,
                                    Math.random() * 1000,
                                    Math.random() * 1000,
                                    Math.random() * 1000
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width}
                    height={190}
                    chartConfig={{
                        backgroundColor: "#52b79a",
                        backgroundGradientFrom: "#2ec79c",
                        backgroundGradientTo: "#2ec79c",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "4",
                            strokeWidth: "2",
                            stroke: "#212120"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>

            <View style={style.box}>
                <View style={style.bexExpenses}>
                    <Text style={{ color: "white" }}>Expenses</Text>
                    <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>1.888.000</Text>
                </View>

                <ScrollView style={style.boxHistory} showVerticalScrollIndicator={false}>
                    <Text style={{ color: "#52b79a", fontSize: 18, fontWeight: "bold", marginVertical: 15 }}>History</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', paddingBottom: 400 }}>
                        {dataTransactions.map((transaction, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ backgroundColor: "#ddebf9", width: "100%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }} onPress={handleViewMore(transaction)}>
                                    <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>{convertDate(transaction.date)}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>Expenses</Text>
                                        <Text style={{ color: 'red', fontWeight: 'bold' }}>Rp {convertToRupiah(transaction.total)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            
            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContainer}>
                        <TouchableOpacity style={{ width: "100%", height: "100%", backgroundColor: "black", opacity: 0.5 }} onPress={() => setModalVisible(false)} />
                        
                        <KeyboardAvoidingView style={{ paddingTop: ExpoConstant.statusBarHeight, position: "absolute", width: '90%', height: "70%", backgroundColor: "white", borderRadius: 10, marginLeft: 20 }} >
                            <Text>xx</Text>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </Modal> */}
        </View >
    )

}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#2ec79c'
    },
    box: {
        height: "90%",
        backgroundColor: '#52b79a',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    bexExpenses: {
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    boxHistory: {
        height: "90%",
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 10,

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
});