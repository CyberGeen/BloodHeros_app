import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainUiParams from './../parameters/MainUiParams';
import EditUserData from './../parameters/EditUserData';
import ShowUserData from './../parameters/ShowUserData';
import TempLogOutScreen from './TempLogOutScreen';
import SinglePost from './../post/SinglePost';
import ScanUserQr from './../parameters/ScanUserQr';

const Stack = createNativeStackNavigator();

const ParameterScreen = () => {
    
  return (
    <Stack.Navigator initialRouteName='main' >
        <Stack.Screen name='main' component={MainUiParams} />
        <Stack.Screen name='edit' component={EditUserData} /> 
        <Stack.Screen name='user' component={ShowUserData} /> 
        <Stack.Screen name='logout' component={TempLogOutScreen} />
        <Stack.Screen name='single' component={SinglePost} />
        <Stack.Screen name='scanQr' component={ScanUserQr} />
        
    </Stack.Navigator>
  )
}

export default ParameterScreen