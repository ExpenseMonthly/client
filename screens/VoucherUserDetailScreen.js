import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage, Alert } from 'react-native'
import ExpoConstants from 'expo-constants'
import Constants from '../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/actions'
import { convertDate } from '../constants/Utilities'
import Loading from '../components/Loading'
import Colors from '../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { UserAxios } from '../constants/Utilities'

function VoucherUserDetailScreen(props) {
    const { voucher } = props.navigation.state.params;
    const { _id, title, expire_date, description, image, point } = voucher;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    async function getUser() {
        const token = await AsyncStorage.getItem('token')
        
        const { data } = await UserAxios({
            url: "/",
            method: "GET",
            headers: { token }
        })
        await dispatch(setUser(data))
    }

    useEffect(() => {
        getUser()
        props.navigation.addListener(
            'didFocus',
            payload => {
                getUser()
            }
        )
    }, [])

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
                        <TouchableOpacity style={styles.redeemButton}>
                            <Text style={{ textAlign: "center", color: "white" }}>Redeem</Text>
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
    redeemButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.mainColor,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 250
    }
})

export default VoucherUserDetailScreen