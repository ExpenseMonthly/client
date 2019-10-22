import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'
import ExpoConstants from 'expo-constants'
import Constants from '../constants/Colors'
import { convertDate } from '../constants/Utilities'
import { LinearGradient } from 'expo-linear-gradient'
import Loading from '../components/Loading'
import Colors from '../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
function VoucherDetailScreen(props) {
    const { voucher } = props.navigation.state.params
    const { title, expire_date, description, image, point } = voucher
    if (!voucher) return <Loading />
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: image }}
            />
            <View style={styles.detailContainer}>
                <ScrollView style={{ width: "100%", height: "100%" }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.point}>Point : {point}</Text>
                        </View>
                        <Text style={styles.description}>{description}</Text>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.date}>{convertDate(expire_date)}</Text>
                        </View>
                        <TouchableOpacity style={styles.purchaseButton}>
                            <Text style={{ textAlign: "center" }}>Purchase</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
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
    },
    image: {
        width: "100%",
        height: 300,
        position: "absolute",
        top: 0,
    },
    detailContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 40,
        paddingTop: 30,
        marginTop: 400,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: Constants.mainColor
    },
    date: {
        fontSize: 15,
        color: "orange",
        textAlign: "right"
    },
    Point: {
        fontSize: 15,
        color: "orange"
    },
    description: {
        fontSize: 20,
        color: Colors.lightFont
    },
    purchaseButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.mainColor,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 250
    }
})

export default VoucherDetailScreen