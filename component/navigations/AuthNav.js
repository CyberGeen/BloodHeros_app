import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View , Text } from 'react-native';


const Tab = createBottomTabNavigator();



const AuthNav = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator >
                <Tab.Screen name="Login" component={LoginScreen} />
                <Tab.Screen name="SignUp" component={SignUpScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AuthNav
