import React , {useContext  , useEffect } from 'react'
import { View, Text , FlatList } from 'react-native'
import PostContext from './../context/PostContext';

const SinglePost = ({route}) => {
    //route.setPosts('fooo me')
    const {setPosts , posts} =  useContext(PostContext)
    let currentPost = posts.find( post => post._id === route.params.id )
    
    useEffect(()=>{
        //setPosts("lez gooo")
        //console.log(currentPost.comments)
    } , [] )
    
    const renderComment = ({item:comment}) => {
        return(
            <View>
                <Text>{comment.content.trim()}</Text>
            </View>
        )
    }

    return (
        <View>
            <Text> {currentPost.title } </Text>
            <Text> {currentPost.description} </Text>
            <Text> {currentPost.blood_type} </Text>
            <Text> {currentPost.city} </Text>
            <Text>---------- comments ----------------</Text>
            <FlatList 
                data={currentPost.comments}
                keyExtractor={item => item._id}
                renderItem={renderComment}
            /> 
        </View>
    )
}

export default SinglePost

/* 
<FlatList 
                data={currentPost.comments}
                keyExtractor={}
            /> */