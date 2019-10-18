import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default function ScanScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  useEffect(async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission({ hasCameraPermission: status === 'granted' });
  }, [])
  
  
  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
          </View>
        </Camera>
      </View>
    );
  }
}