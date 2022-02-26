import React from 'react';
import { StyleSheet , View , Text , TouchableOpacity } from 'react-native';
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
                    options={
                        {headerShown : false}
                    }
                />
                <Stack.Screen
                name='single' 
                    component={SinglePost}
                    options={{
                        headerStyle: styles.headerStyle,
                        headerTintColor: '#fff',
                        headerTitleStyle: styles.headerTitleStyle ,
                        
                    }}
                />
            </Stack.Navigator>
        
    )
}




//dont repeat navigation container when nesting
const styles = StyleSheet.create({
    headerStyle : {
        backgroundColor: '#f4511e',
        
    } , 
    headerTitleStyle : {
        fontWeight: 'bold',
        flexGrow : 1
    }
})



