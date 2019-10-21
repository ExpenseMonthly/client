import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, Picker } from 'react-native';
import Constants from 'expo-constants';
import { TransactionAxios, convertToRupiah, convertDate, convertMonth, convertYear, addZero, getDate } from '../constants/Utilities';
import Loading from '../components/Loading';
import {
    LineChart
} from "react-native-chart-kit";

export default function ScanScreen(props) {
    const [loading, setLoading] = useState(false);

    const [month, setMonth] = useState('10');
    const [year, setYear] = useState('2019');

    const [dataTransactions, setDataTransactions] = useState([]);
    const [summaryTransaction, setSummaryTransaction] = useState({
                                                                    total: 0,
                                                                    week1: 0,
                                                                    week2: 0,
                                                                    week3: 0,
                                                                    week4: 0
                                                                });

    const [modalVisible, setModalVisible] = useState(false);

    const changeDate = () => {
        setModalVisible(true)
    }

    const getTransactionRange = async (startDate, endDate) => {
        try {
            setLoading(true)
            const token = await AsyncStorage.getItem("token");
            const { data } = await TransactionAxios({
                url: `/findRange/${startDate}/${endDate}`,
                method: "GET",
                headers: { token }
            })
            
            let newSummaryTransaction = {
                total: 0,
                week1: 0,
                week2: 0,
                week3: 0,
                week4: 0
            }
            
            data.forEach(el => {
                newSummaryTransaction.total += Number(el.total),

                newSummaryTransaction.week1 += (getDate(el.date) <= 7) ? Number(el.total) : 0;
                newSummaryTransaction.week2 += (getDate(el.date) > 7 && getDate(el.date) <= 14) ? Number(el.total) : 0;    
                newSummaryTransaction.week3 += (getDate(el.date) > 14 && getDate(el.date) <= 21) ? Number(el.total) : 0;
                newSummaryTransaction.week4 += (getDate(el.date) > 14) ? Number(el.total) : 0;
            });
            
            setSummaryTransaction(newSummaryTransaction);
            
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
                getTransactionRange(`${year}-${month}-01`, `${year}-${month}-31`)
            }
        )
    }, [])

    useEffect(() => {
        getTransactionRange(`${year}-${month}-01`, `${year}-${month}-31`)
    }, [month, year])

    if (loading) return <Loading />

    return (
        <View style={[style.container, { paddingTop: Constants.statusBarHeight }]}>
            <View style={{ marginVertical: 12, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Picker
                    selectedValue={month}
                    style={{ height: 20, width: 100, color: "white" }}
                    onValueChange={(itemValue, itemIndex) =>
                        setMonth(itemValue)
                    }
                >
                    {
                        Array(12).fill(0).map((x, i) => <Picker.Item key={'month' + i} label={convertMonth(`${year}-${addZero(i + 1)}-01`)} value={addZero(i + 1)} />)
                    }
                </Picker>
                <Picker
                    selectedValue={year}
                    style={{ height: 20, width: 100, color: "white" }}
                    onValueChange={(itemValue, itemIndex) =>
                        setYear(itemValue)
                    }
                >
                    {
                        Array(3).fill(0).map((x, i) => <Picker.Item key={'year' + i} label={convertYear(`${2019 + i}-${month}-01`)} value={2019 + i} />)
                    }
                </Picker>
            </View>
            <View style={{ witdh: "100%", paddingHorizontal: 20, justifyContent: "center", alignContent: "center" }}>

                <LineChart
                    data={{
                        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                        datasets: [
                            {
                                data: [
                                    summaryTransaction.week1,
                                    summaryTransaction.week2,
                                    summaryTransaction.week3,
                                    summaryTransaction.week4
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
                    <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>{summaryTransaction.total}</Text>
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
});