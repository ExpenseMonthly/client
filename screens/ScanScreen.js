import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { TransactionAxios } from '../constants/Utilities';
// import FormData from 'form-data';

export default function ScanScreen(props) {
    const [hasCameraPermission, setHasCameraPermission] = useState('granted');
    const [isFocused, setIsFocused] = useState(true)
    async function openCamera() {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasCameraPermission({ hasCameraPermission: status === 'granted' });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        openCamera()
        props.navigation.addListener(
            'didFocus',
            payload => {
                setIsFocused(true)
            }
        )

        props.navigation.addListener(
            'didBlur',
            payload => {
                setIsFocused(false)
            }
        )
    }, []);

    handleSnap = async () => {
        try {
            if (camera) {
                let photo = await camera.takePictureAsync({
                    base64: true,
                    aspect: [4, 3]
                });

                let token = await AsyncStorage.getItem("token");

                let formData = new FormData();
                formData.append("file", photo.base64);

                const { data } = await TransactionAxios({
                    url: '/',
                    method: "POST",
                    data: formData,
                    headers: {
                        // Accept: 'application/json',
                        // 'Content-Type': 'multipart/form-data',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        "token": token,
                    }
                })

                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    };

    if (!isFocused) return <View><Text>testing</Text></View>
    else if (isFocused)
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1, alignItems: "center" }} type={Camera.Constants.Type.back} ref={ref => {
                    camera = ref;
                }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                    </View>

                    <TouchableOpacity style={styles.buttonCamera} onPress={() => handleSnap()}>
                        <FontAwesome name="camera" size={26} color='#52b79a' />
                    </TouchableOpacity>
                </Camera>
            </View>
        );
}
const styles = StyleSheet.create({
    buttonCamera: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        width: 60,
        height: 60,
        borderColor: "#52b79a",
        borderWidth: 4,
        marginBottom: 30
    }
})