import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
export default createAppContainer(
    createSwitchNavigator({
        Login: LoginScreen,
        Register: RegisterScreen,
        Main: MainTabNavigator,
    })
);
