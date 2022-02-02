import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePostScreen from '../screens/CreatePostScreen'
import TempLogOutScreen from './../screens/TempLogOutScreen';
import PostNav from './PostNav';
import postsHook from '../hooks/postsHook';
import PostContext from '../context/PostContext';

const Tab = createBottomTabNavigator();

const MainNav = () => {
    const {posts , setPosts} = postsHook()
    return (
        <PostContext.Provider value={{posts , setPosts} } >
            <NavigationContainer>
                <Tab.Navigator >
                    <Tab.Screen name="create post" component={CreatePostScreen} />
                    <Tab.Screen name="loggout" component={TempLogOutScreen} />
                    <Tab.Screen name="home" component={PostNav} />
                </Tab.Navigator>
            </NavigationContainer>
        </PostContext.Provider>
    )
}
export default MainNav