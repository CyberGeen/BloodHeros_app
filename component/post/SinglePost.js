import React , {useContext  , useEffect ,useState } from 'react'
import { View, Text , FlatList , TouchableOpacity , ScrollView , StyleSheet } from 'react-native'
import PostContext from './../context/PostContext';
import UserContext from './../context/UserContext';
import AppInput from '../form/AppInput';
import { postComment } from '../../services/httpPostService';
import { getComments } from '../../services/httpPostService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '../form/AppButton';


const SinglePost = ({route}) => {
    const {setPosts , posts} =  useContext(PostContext)
    const {user} = useContext(UserContext)
    let currentPost = posts.find( post => post._id === route.params.id )
    const [newComment, setComment] = useState('')


    useEffect( ()=>{
        //prevent re render if re entering 
        if (!currentPost.gotComments) {getComments(route.params.id).then( (res) => {
            let newPosts = [...posts]
            newPosts.forEach( (post => {
                if(post._id === route.params.id ){
                    post.comments = res.data
                    post.gotComments = true
                }
            } ) )
            setPosts(newPosts)
        } ).catch( err => console.log(err) )}
    } , [] )

    const renderComment = ({item:comment}) => {
        if(currentPost.gotComments){
            return(
                <View style={styles.container} >
                    <Text> by : {comment.postedBy.name} </Text>
                    <Text>{comment.content.trim()}</Text>
                    {
                        (comment.postedBy._id === user._id ) && (
                            <>
                                <TouchableOpacity onPress={() => handleDeleteComment( currentPost._id , comment._id)} >
                                    <MaterialCommunityIcons
                                        name='delete'
                                        size={25} 
                                        color={'red'} 
                                        />
                                </TouchableOpacity>
                            </>
                        )
                    }
                </View>
            )
            
        }
        
    }

    //values needed for updating color state of vote
    const up = setPosts(route.params.id , 'CHECK_UP')
    const down = setPosts(route.params.id , 'CHECK_DOWN')
    


    const handleCommentSubmit =  () => {
        postComment({content : newComment} , route.params.id )
            .then( (data) => {
                if(data.response){
                    console.log("error here")
                }
                if(data.data){
                    let tempPosts = posts.slice()
                    //tempPosts.push(posts)
                    //tempPosts = tempPosts[0]
                    tempPosts = tempPosts.map( (temp) => {
                        if(temp._id === route.params.id ){
                            temp.comments = data.data
                        }
                        return temp
                    } )
                    setPosts(tempPosts)
                    setComment('')
            } } )
            .catch( (err) => console.log(err) )
    }

    const handleDeleteComment = (postId , commentId) => {
        setPosts({postId , commentId} , "DELETE_COMMENT")
    }

    const header = () => {
        return (
            <>
                <TouchableOpacity onPress={() => setPosts(route.params.id , 'UP') } >
                    <MaterialCommunityIcons 
                        name={'chevron-up'}
                        size={30}
                        color={ up?'green':'lightgrey' }
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPosts(route.params.id , 'DOWN') } >
                    <MaterialCommunityIcons 
                        name={'chevron-down'}
                        size={30}
                        color={ down?'red':'lightgrey' }
                    />
                </TouchableOpacity>
                <Text> {currentPost.title } </Text>
                <Text> {currentPost.description} </Text>
                <Text> {currentPost.blood_type} </Text>
                <Text> {currentPost.city} </Text>
                <Text>---------- comments ----------------</Text>
            </>
        )
    }

    
    const footer = () => {
        if(!currentPost.gotComments){
            return(
                <>
                    <Text>Loading...</Text>
                </>
            )
        }
        return (    
            <>
                <AppInput 
                    iconName={'comment'}
                    placeholder={'say something nice...'}
                    onChangeText={setComment}
                    value={newComment}
                >
    
                {newComment.length>1 && 
                <TouchableOpacity onPress={() => handleCommentSubmit() } >
                <MaterialCommunityIcons 
                name='send-circle-outline'
                size={30}
                style={{flexDirection: "row" , paddingTop : 20 , paddingRight: 10 }}
                color={'grey'}
            />
                </TouchableOpacity>
            }
    
                </AppInput>
        </>) 
    }

    const styles = StyleSheet.create({
        button: {
            margin: 5,
            height: 25,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          },
          container: {
            flexDirection: "row",
          },
          text: {
            fontWeight: "600",
            fontSize: 10,
          },
    })

    return (
            <FlatList 
                data={currentPost.comments}
                keyExtractor={item => item._id}
                renderItem={renderComment}
                //static header can make it as a function
                ListHeaderComponent={header}
                ListFooterComponent = { footer()}

            /> 
            
            
        
    )
}

export default SinglePost