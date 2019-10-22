import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import ExpoConstants from 'expo-constants'
import Constants from '../constants/Colors'
import { convertDate } from '../constants/Utilities'
import Voucher from '../components/Voucher'
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
function VoucherListScreen(props) {
    const vouchers = [
        {
            _id: "12345611232132132178",
            title: "Diskon 50% (Cashback Max. Rp20.000)",
            image: "https://cdn2.tstatic.net/surabaya/foto/bank/images2/promo-cashback-ovo-60-persen.jpg",
            expire_date: new Date(),
            point: 2,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            _id: "1234567123213213218",
            title: "Diskon 50% (Cashback Max. Rp20.000)",
            image: "https://cdn2.tstatic.net/surabaya/foto/bank/images2/promo-cashback-ovo-60-persen.jpg",
            expire_date: new Date(),
            point: 2,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            _id: "12345623128",
            title: "Diskon 50% (Cashback Max. Rp20.000)",
            image: "https://cdn2.tstatic.net/surabaya/foto/bank/images2/promo-cashback-ovo-60-persen.jpg",
            expire_date: new Date(),
            point: 2,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            _id: "12345612321321378",
            title: "Diskon 50% (Cashback Max. Rp20.000)",
            image: "https://cdn2.tstatic.net/surabaya/foto/bank/images2/promo-cashback-ovo-60-persen.jpg",
            expire_date: new Date(),
            point: 2,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            _id: "1123212345612321321378",
            title: "Diskon 50% (Cashback Max. Rp20.000)",
            image: "https://cdn2.tstatic.net/surabaya/foto/bank/images2/promo-cashback-ovo-60-persen.jpg",
            expire_date: new Date(),
            point: 2,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ]

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