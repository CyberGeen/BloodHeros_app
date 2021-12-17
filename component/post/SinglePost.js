import React , {useContext  , useEffect } from 'react'
import { View, Text } from 'react-native'
import PostContext from './../context/PostContext';

const SinglePost = ({route}) => {
    //route.setPosts('fooo me')
    const {setPosts , posts} =  useContext(PostContext)
    useEffect(async()=>{
        setPosts("lez gooo")
    } , [] )
    return (
        <View>
            <Text>single post : {route.params.posts} main state : {posts} </Text>
        </View>
    )
}

export default SinglePost
