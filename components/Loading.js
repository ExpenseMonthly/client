import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Color from '../constants/Colors'
function Loading(props) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={props.color ? props.color : "#019125"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.mainColor,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default Loading