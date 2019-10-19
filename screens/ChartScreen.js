import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';

import {
    LineChart
} from "react-native-chart-kit";

export default function ScanScreen() {
    return <View style={style.container}>
        <LineChart
            data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                    }
                ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={190}
            yAxisLabel={"$"}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#000000",
                backgroundGradientTo: "#212120",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
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
                    
                    <View style={{ backgroundColor: "#ddebf9", width: "49%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>12 Agus</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Expenses</Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>70.000</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "#ddebf9", width: "49%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>11 Agus</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Expenses</Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>70.000</Text>
                        </View>
                    </View>
                    
                    <View style={{ backgroundColor: "#ddebf9", width: "49%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>10 Agus</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Expenses</Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>70.000</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "#ddebf9", width: "49%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>9 Agus</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Expenses</Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>70.000</Text>
                        </View>
                    </View>
                    
                    <View style={{ backgroundColor: "#ddebf9", width: "49%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>10 Agus</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Expenses</Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>70.000</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "#ddebf9", width: "49%", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 5, borderRadius: 10 }}>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold' }}>9 Agus</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Expenses</Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>70.000</Text>
                        </View>
                    </View>
                    
                </View>
            </ScrollView>
        </View>
    </View>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
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