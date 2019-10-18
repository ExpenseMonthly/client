import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: { headerMode: 'none' },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      Icon={FontAwesome}
      focused={focused}
      name="home"
    />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected
  }
};

HomeStack.path = '';

const ScanStack = createStackNavigator(
  {
    Scans: ScanScreen,
  },
  config
);

ScanStack.navigationOptions = {
  tabBarLabel: 'Scans',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon Icon={FontAwesome} focused={focused} name="camera" />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected
  }
};

ScanStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon Icon={Ionicons} focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected
  }
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScanStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
