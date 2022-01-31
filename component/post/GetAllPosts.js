import React , {useContext , useEffect} from 'react'
import { View, Text , FlatList , Button, ScrollView, TouchableOpacity } from 'react-native'
import PostContext from './../context/PostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const GetAllPosts = ({navigation}) => {
    const {posts , setPosts} = useContext(PostContext)

    const renderPostUi  = ({item:post}) => {
        const up = setPosts(post._id , 'CHECK_UP')
        const down = setPosts(post._id , 'CHECK_DOWN')

        return(
            <View>
                <TouchableOpacity onPress={() => setPosts(post._id , 'UP') } >
                <MaterialCommunityIcons 
                    name={'chevron-up'}
                    size={30}
                    color={ up?'green':'lightgrey' }
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPosts(post._id , 'DOWN') } >
                <MaterialCommunityIcons 
                    name={'chevron-down'}
                    size={30}
                    color={ down?'red':'lightgrey' }
                />
            </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('single', {id : post._id})}} >  
                    <Text>posted by {post.posted_by.name} </Text>
                    <Text>{post.title}</Text>
                    <Text>{post.description}</Text>
                    <Text>{post.blood_type}</Text>
                    <Text>{post.city}</Text>
                    <Text>{post.until_donation}</Text>
                </TouchableOpacity>
            </View>
        )
    } 
    
    return(
        
            <View>
            <FlatList
                data={posts}
                renderItem={renderPostUi}
                keyExtractor={item => item._id}
            />
            </View>
        
    )
    /*
    return (
        <View>
            <FlatList
                data={}
                renderItem={({item})=>{}}
                keyExtractor={item => item._id}
            />
        </View>
    ) */
}

/* 
    <Text>{posts}</Text>
                <Button title='goto a post' onPress={()=>{navigation.navigate('single', {posts})}} />
*/

export default GetAllPosts
