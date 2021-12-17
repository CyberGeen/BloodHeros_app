import React , {useEffect , useState , useContext } from 'react'
import { View, Text , FlatList } from 'react-native'
import GetAllPosts from '../post/GetAllPosts'
import PostContext from './../context/PostContext';
import postsHook from './../hooks/postsHook';

const MainPostsScreen = ({navigation}) => {
    const {posts , setPosts} = useContext(PostContext)
    useEffect(()=>{
        setPosts("bruh")
    },[])
    if(!posts){
        return(
            <View>
                <Text>Loading Component Implimentation</Text>
            </View>
        )
    }
    return (
        
            <GetAllPosts 
                navigation={navigation}
            />
    )
}

export default MainPostsScreen

