import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { TransactionAxios } from '../constants/Utilities'
import {
    LineChart
} from "react-native-chart-kit";

export default function ScanScreen(props) {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('2019-10-15');
    const [endDate, setEndDate] = useState('2019-10-22');
    const [dataTransactions, setDataTransactions] = useState(Array);

    const getTransactionRange = async () => {
        try {
            await setLoading(true)
            const token = await AsyncStorage.getItem("token");
            const { data } = await TransactionAxios({
                url: `/findRange/${startDate}/${endDate}`,
                method: "GET",
                headers: { token }
            })
            console.log(data)
            setDataTransactions(data);
            setLoading(false)
            console.log(dataTransactions, "<<<<<<")
        } catch (err) {
            if (err.response.data)
                console.log(err.response.data)
            else
                console.log(err)
        }
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

    if (loading) return <ActivityIndicator size="large" color="#E67E22" style={{ flex: 1 }} />;

    return (
        <View style={[style.container, { paddingTop: Constants.statusBarHeight }]}>
            <View style={{ marginVertical: 12, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity><Text style={{ color: "#ffffff", fontSize: 15, fontWeight: 'bold' }}>X</Text></TouchableOpacity>
                    <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>Monthly Report</Text>
                </View>
                <TouchableOpacity><Text style={{ color: "#ffffff", fontSize: 15, fontWeight: 'bold' }}>Agust 2019</Text></TouchableOpacity>
            </View>

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
                width={Dimensions.get("window").width} // from react-native
                height={190}
                yAxisLabel={"Rp"}
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

            <View style={style.box}>
                <View style={style.bexExpenses}>
                    <Text style={{ color: "white" }}>Expenses</Text>
                    <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>1.888.000</Text>
                </View>

                <ScrollView style={style.boxHistory}>
                    <Text style={{ color: "#52b79a", fontSize: 18, fontWeight: "bold", marginVertical: 15 }}>History</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {dataTransactions.map((trx, index) => {
                            return (
                                <View key={index} style={{ backgroundColor: "#ddebf9", width: "49%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                                    <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>12 Agus</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>Expenses</Text>
                                        <Text style={{ color: 'red', fontWeight: 'bold' }}>0</Text>
                                    </View>
                                </View>
                            )
                        })}

                    </View>
                </ScrollView>
            </View>
        </View>
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
        paddingTop: 10
    }
});