import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setLoginStatus, setUser } from '../redux/actions'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function EditProfile(props) {
    console.log(props);
    return (
        <View>
            <Text>hahahaha</Text>
        </View>
    );
};

export default EditProfile;