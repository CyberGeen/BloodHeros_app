import React , {useEffect , useContext } from 'react'
import { View, Text  } from 'react-native'
import GetAllPosts from '../post/GetAllPosts'
import PostContext from './../context/PostContext';
import { getPosts } from '../../services/httpPostService';

const MainPostsScreen = ({navigation}) => {
    const {posts , setPosts} = useContext(PostContext)

    const asyncGetPosts = async () => {
        try {
            let newPosts = await getPosts()
            setPosts(newPosts.data)
            newPosts.data.forEach( (post) => {
                post.gotComments = false
            } )
        } catch (err) {
            console.log(err.response)
        }
    }
    useEffect( ()=>{
        asyncGetPosts()
    } , [] ) 

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

