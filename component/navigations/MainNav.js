import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePostScreen from '../screens/CreatePostScreen'
import PostNav from './PostNav';
import postsHook from '../hooks/postsHook';
import PostContext from '../context/PostContext';
import ParameterScreen from './../screens/ParameterScreen';

const Tab = createBottomTabNavigator();

const MainNav = () => {
    const {posts , setPosts} = postsHook()
    return (
        <PostContext.Provider value={{posts , setPosts} } >
             <NavigationContainer>            
                <Tab.Navigator >
                    <Tab.Screen name="create post" component={CreatePostScreen} />
                    <Tab.Screen name="home" component={PostNav} />
                    <Tab.Screen name="Parameter" component={ParameterScreen}  />
                </Tab.Navigator>
            </NavigationContainer>
        </PostContext.Provider>
    )
}
export default MainNav