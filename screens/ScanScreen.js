import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

export default function ScanScreen(props) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    async function openCamera() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasCameraPermission({ hasCameraPermission: status === 'granted' });
    }

    useEffect(() => {
        openCamera()
    }, []);

    snap = async () => {
        if (camera) {
            let photo = await camera.takePictureAsync();
            
            console.log(photo)
        }
    };

    if (hasCameraPermission === null) {
        return <Text>x</Text>;
    } else if (hasCameraPermission === false) {
        return <Text style={{color: 'blue'}}>No access to camera</Text>;
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1, alignItems: "center" }} type={type} ref={ref => {
                    camera = ref;
                }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                    </View>

                    <TouchableOpacity style={styles.buttonCamera} onPress={() => snap()}>
                        <FontAwesome name="camera" size={26} color='#52b79a' />
                    </TouchableOpacity>
                </Camera>
            </View>
        );
    }
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