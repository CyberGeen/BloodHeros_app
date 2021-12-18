import React , {useContext , useEffect} from 'react'
import { View, Text , FlatList , Button, ScrollView, TouchableOpacity } from 'react-native'
import PostContext from './../context/PostContext';




const GetAllPosts = ({navigation}) => {
    const renderPostUi  = ({item:post}) => {
        return(
            <View>
                <TouchableOpacity onPress={()=>{navigation.navigate('single', {id : post._id})}} >  
                    <Text>{post.title.trim()}</Text>
                    <Text>{post.description.trim()}</Text>
                    <Text>{post.blood_type}</Text>
                    <Text>{post.city}</Text>
                    <Text>{post.until_donation}</Text>
                </TouchableOpacity>
            </View>
        )
    } 
    const {posts , setPosts} = useContext(PostContext)
    
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
