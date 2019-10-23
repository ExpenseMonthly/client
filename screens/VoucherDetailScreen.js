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

function VoucherDetailScreen(props) {
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

    const handlePurchase = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (user.point >= point) {
                await UserAxios({
                    method: "POST",
                    url: "/voucers/" + _id,
                    headers: { token }
                });

                await UserAxios({
                    url: "/point",
                    method: "PATCH",
                    headers: { token },
                    data: {
                        point: point * -1
                    }
                })

                getUser();

                Alert.alert("Voucher purchase successfully");
            } else {
                Alert.alert(`Sorry you need at least ${point} to purchase voucher`);
            }
        } catch (error) {
            if (error.response.data.message)
                Alert.alert(error.response.data.message[0])
            else
                Alert.alert("Opps.. something gone wrong! please reload")
            console.log(error.response)
        }
    }

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
                    <View style={{ marginBottom: 220 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.title}>{title}</Text>
                        </View>

                        <Text style={styles.description}>{description}</Text>
                        <View style={{ flexDirection: "row", height: 40, justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../assets/images/coin.png')}
                                /><Image />
                                <Text style={styles.point}>{point}</Text>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={styles.date}>Expired on : {convertDate(expire_date)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.purchaseButton} onPress={() => handlePurchase()}>
                            <Text style={{ textAlign: "center", color: "white" }}>Purchase</Text>
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
        textAlign: "right",
        fontWeight: "bold"
    },
    point: {
        fontSize: 25,
        color: "orange",
        fontWeight: "bold"
    },
    description: {
        fontSize: 20,
        color: Colors.lightFont,
        minHeight: 270,
        marginBottom : 20
    },
    purchaseButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.mainColor,
        borderRadius: 5,
        marginTop: 10
        // marginBottom: 250
    }
})

export default VoucherDetailScreen