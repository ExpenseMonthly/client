import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'
import { convertDate } from '../constants/Utilities';
function Voucher(props) {
    const { voucher: { title, image, expire_date, description, point } } = props
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: image }}
            />
            <View style={{ padding: 10 }}>
                <Text style={styles.title}>{title}</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-end" , alignItems: "center" }}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../assets/images/coin.png')}
                    /><Image />
                    <Text style={styles.point}>{point}</Text>
                </View>
                <Text style={styles.expire}>Expired on : {convertDate(expire_date)}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        minHeight: 200,
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        marginVertical: 10,
        width: "100%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",

    },
    expire: {
        textAlign: "right"
    },
    point :{
        fontWeight: "bold",
        fontSize: 20,
        color: "orange",
        paddingLeft: 5
    },
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5, 
        width: "100%",
        height: 100,
        resizeMode: "cover"
    }
})


export default Voucher