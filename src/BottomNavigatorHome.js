import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Mainscreen from '../screen/Main';
import IconFood from 'react-native-vector-icons/MaterialCommunityIcons';
import IconDelivery from 'react-native-vector-icons/MaterialCommunityIcons';
 

export default createBottomTabNavigator({
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
        screen: Mainscreen,
        navigationOptions:{
            tabBarLabel:'配送中',
            tabBarIcon: ({tintColor})=>(
                <IconDelivery name="truck-delivery" size={24}/>
            )
        }
    }
});