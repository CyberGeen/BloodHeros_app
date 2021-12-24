import React , {useEffect , useContext } from 'react'
import { View, Text  } from 'react-native'
import GetAllPosts from '../post/GetAllPosts'
import PostContext from './../context/PostContext';
import { getPosts } from '../../services/httpPostService';
import { getGeneralUserInfo } from '../../services/httpUserService';

const MainPostsScreen = ({navigation}) => {
    const {posts , setPosts} = useContext(PostContext)

    const asyncGetPosts = async () => {
        try {
            let newPosts = await getPosts()
            newPosts = newPosts.data
            let tempPosts = []
            newPosts.forEach( (post) => {
                getGeneralUserInfo(post.posted_by).then(res => {
                    post.posted_by =  res.data 

                    let tempComment = []
                    post.comments.forEach( comment => {
                            getGeneralUserInfo(comment.postedBy).then( res=> {
                            comment.postedBy = res.data
                             tempComment.push(comment)
                        } ).catch(err => console.log(err))
                    } )
                    post.comments = tempComment
                    
                    tempPosts.push(post)
                    setPosts(tempPosts)
                }).catch(err => console.log(err))
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

