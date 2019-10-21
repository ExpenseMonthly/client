import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ChartScreen from '../screens/ChartScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import ScanEditScreen from '../screens/ScanEditScreen';
import EditScreen from '../screens/EditScreen';

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
        ScanEdit: ScanEditScreen
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

const ChartStack = createStackNavigator(
    {
        Chart: ChartScreen,
        TransactionDetail: TransactionDetailScreen,
        Edit: EditScreen
    },
    config
);

ChartStack.navigationOptions = {
    tabBarLabel: 'Chart',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon Icon={FontAwesome} focused={focused} name="line-chart" />
    ),
    tabBarOptions: {
        activeTintColor: Colors.tabIconSelected
    }
};

ChartStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    ChartStack,
    ScanStack,
});

tabNavigator.path = '';

export default tabNavigator;
