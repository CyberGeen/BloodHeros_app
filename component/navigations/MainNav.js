import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePostScreen from '../screens/CreatePostScreen'
import TempLogOutScreen from './../screens/TempLogOutScreen';
const Tab = createBottomTabNavigator();

const MainNav = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator >
                <Tab.Screen name="create post" component={CreatePostScreen} />
                <Tab.Screen name="loggout" component={TempLogOutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default MainNav