import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { TransactionAxios } from '../constants/Utilities';
export default function ScanScreen(props) {
    const [hasCameraPermission, setHasCameraPermission] = useState('granted');
    const [isFocused, setIsFocused] = useState(true);
    const [loading, setLoading] = useState(false);

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
                    aspect: [4, 3],
                });
                setLoading(true)
                let token = await AsyncStorage.getItem("token");

                let formData = new FormData();
                formData.append("file", photo.uri);

                const { data } = await TransactionAxios({
                    url: '/',
                    method: "POST",
                    data: {
                        photo
                    },
                    headers: {
                        "token": token,
                    }
                })
                setLoading(false)
                props.navigation.navigate('ScanEdit', { data })
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    };

    if (!isFocused) return <View><Text>testing</Text></View>
    else if (isFocused)
        if (loading) return <ActivityIndicator size="large" color="#E67E22" style={{ flex: 1 }} />;
        else
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, alignItems: "center" }} type={Camera.Constants.Type.back} flashMode={Camera.Constants.FlashMode.on} ref={ref => {
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