import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux'
import store from './redux'
import AppNavigator from './navigation/AppNavigator';
import Constants from 'expo-constants'
import { setLoginStatus } from './redux/actions';
export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    async function checkIsLogin() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                await store.dispatch(setLoginStatus(true))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        checkIsLogin()
    }, [])

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <Provider store={store}>

                <AppLoading
                    startAsync={loadResourcesAsync}
                    onError={handleLoadingError}
                    onFinish={() => handleFinishLoading(setLoadingComplete)}
                />
            </Provider>
        );
    } else {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar />
                    <AppNavigator />
                </View>
            </Provider>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/robot-dev.png'),
            require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        }),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.StatusBarHeight
    },
});
