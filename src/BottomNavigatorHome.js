import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Mainscreen from '../screen/Main';
import IconFood from 'react-native-vector-icons/MaterialCommunityIcons';
import IconDelivery from 'react-native-vector-icons/MaterialCommunityIcons';
import PersonIcon from 'react-native-vector-icons/MaterialIcons';
import PersonalCenter from '../screen/PersonalCenter';
import Delivering from '../screen/Delivering';
 

const BottomNavigation =  createBottomTabNavigator({
    Home: {
        screen: Mainscreen,
        navigationOptions:{
            tabBarLabel:'待取餐',
            tabBarIcon: ({tintColor})=>(
                <IconFood name="food" size={24}/>
            )
        }
    },
    Tracking: {
        screen: Delivering,
        navigationOptions:{
            tabBarLabel:'配送中',
            tabBarIcon: ({tintColor})=>(
                <IconDelivery name="truck-delivery" size={24}/>
            )
        }
    },
    PersonalInfo: {
        screen: PersonalCenter,
        navigationOptions:{
            tabBarLabel:'个人中心',
            tabBarIcon: ({tintColor})=>(
                <PersonIcon name="person" size={24}/>
            )
        }
    }
});


export default BottomNavigation;