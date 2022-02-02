import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPostsScreen from './../screens/MainPostsScreen';
import SinglePost from './../post/SinglePost';
const Stack = createNativeStackNavigator();

export default PostNav = () => {
    return(
       
            <Stack.Navigator initialRouteName='main' >
                <Stack.Screen 
                name='main'
                    component={MainPostsScreen}
                />
                <Stack.Screen
                name='single' 
                    component={SinglePost}
                />
            </Stack.Navigator>
        
    )
}
//dont repeat navigation container when nesting





