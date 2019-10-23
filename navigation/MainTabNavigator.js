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
import WheelScreen from '../screens/WheelScreen';
import RememberMe from '../screens/GameScreen';
import EditScreen from '../screens/EditScreen';
import Profile from '../screens/editProfile';
import VoucherUserList from '../screens/VoucherUserList'

import VoucherListScreen from '../screens/VoucherListScreen'
import VoucherDetailScreen from '../screens/VoucherDetailScreen'
import VoucherUserDetailScreen from '../screens/VoucherUserDetailScreen'

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: { headerMode: 'none' },
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Profile: Profile,
        VoucherUser: VoucherUserList,
        VoucherUserDetail: VoucherUserDetailScreen,
        Game1: RememberMe,
        Game2: WheelScreen,
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
    },
    tabBarVisible : () => {
        return (navigation.state.routes[navigation.state.index].routeName =='Game' ) ? false : true 
    }
    
};

// HomeStack.navigationOptions = ({ navigation }) => {
//     let tabBarVisible = true;
//     let routeName = navigation.state.routes[navigation.state.index].routeName
//     if (routeName == 'Game') {
//         tabBarVisible = false
//     }
//     return {
//         tabBarVisible,
//     }
// }

HomeStack.path = '';
// HomeStack.navigationOptions = ({ navigation }) => {
//     let tabBarVisible = true;
//     let routeName = navigation.state.routes[navigation.state.index].routeName
//     if (routeName == 'Game') {
//         tabBarVisible = false
//     }

//     return {
//         tabBarVisible,
//     }
// }


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

const VoucherStack = createStackNavigator(
    {
        VoucherList: VoucherListScreen,
        VoucherDetail: VoucherDetailScreen
    },
    config
)
VoucherStack.navigationOptions = {
    tabBarLabel: 'Voucher',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon Icon={FontAwesome} focused={focused} name="bookmark" />
    ),
    tabBarOptions: {
        activeTintColor: Colors.tabIconSelected
    }
}

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    VoucherStack,
    ChartStack,
    ScanStack,
});

tabNavigator.path = '';

export default tabNavigator;
