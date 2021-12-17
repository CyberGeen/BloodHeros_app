import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Test1 from './../Test1';
import Test2 from './../Test2';
import MainPostsScreen from './../screens/MainPostsScreen';
import SinglePost from './../post/SinglePost';
import postsHook from '../hooks/postsHook';
import PostContext from '../context/PostContext';

const Stack = createNativeStackNavigator();

export default PostNav = () => {
    const {posts , setPosts} = postsHook("idk")
    return(
        <PostContext.Provider value={{posts , setPosts} } >
            <Stack.Navigator initialRouteName='Fatha' >
                <Stack.Screen 
                name='main'
                    component={MainPostsScreen}
                />
                <Stack.Screen
                name='single' 
                    component={SinglePost}
                />
            </Stack.Navigator>
            </PostContext.Provider>
        
    )
}
//dont repeat navigation container when nesting





