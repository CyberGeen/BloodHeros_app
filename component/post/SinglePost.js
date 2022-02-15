import React , {useContext  , useEffect ,useState } from 'react'
import { View, Text , FlatList , TouchableOpacity , Modal , StyleSheet } from 'react-native'
import PostContext from './../context/PostContext';
import UserContext from './../context/UserContext';
import AppInput from '../form/AppInput';
import { postComment } from '../../services/httpPostService';
import { getComments } from '../../services/httpPostService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '../form/AppButton';


const SinglePost = ({route , navigation }) => {
    const {setPosts , posts} =  useContext(PostContext)
    
    const {user} = useContext(UserContext)
    
    let currentPost = posts.find( post => post._id === route.params.id )
    
    //comment state
    const [newComment, setComment] = useState('')
    
    //modal visibility state
    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect( ()=>{
        //prevent re render if re entering 
        if (!currentPost.gotComments) {
            if(currentPost.comments.length === 0  ){
                let newPosts = [...posts]
                newPosts.forEach( (post => {
                    if(post._id === route.params.id ){
                        post.gotComments = true
                    }
                } ) )
                setPosts(newPosts)
            }
            getComments(route.params.id).then( (res) => {
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
    

    // comment submition logic

    const handleCommentSubmit =  () => {
        postComment({content : newComment} , route.params.id )
            .then( (data) => {
                if(data.response){
                    //FIXME: indicating an erreur in the server 
                    console.log("error here")
                }
                if(data.data){
                    let tempPosts = posts.slice()
                    tempPosts = tempPosts.map( (temp) => {
                        if(temp._id === route.params.id ){
                            // changing the whole comment section to the new comment section we get from the server
                            // since the comment need to have its own id cant aproach it optimisticly
                            temp.comments = data.data
                        }
                        return temp
                    } )
                    setPosts(tempPosts)
                    setComment('')
            } } )
            .catch( (err) => console.log(err) )
    }

    // deleting comment : passing the data to the hook 
    const handleDeleteComment = (postId , commentId) => {
        setPosts({postId , commentId} , "DELETE_COMMENT")
    }

        // handle deleting post : 

        const handleDeletePost = () => {
            setModalVisibility(false)
            navigation.navigate('main')
            setPosts(currentPost , 'DELETE_POST' )
            //FIXME: add reported animation
        }
    
        // handle reporting a post :
        
        const handleReportPost = () => {
            setPosts(currentPost , 'REPORT_POST' )
            setModalVisibility(false)
            //FIXME: add reported animation
        }

        // handle edit post :

        const handleEditPost = () => {
            setModalVisibility(false)
            navigation.navigate('create post' , {
                state : {
                    title : currentPost.title ,
                    description : currentPost.description ,
                    blood_type : currentPost.blood_type ,
                    tags : currentPost.tags ,
                    city : currentPost.city ,
                    until_donation : currentPost.until_donation 
                },
                id : currentPost._id
            } )
        }

    // header and footer got created bcs Flatlist dont accept another scrolable view logic , everything should be included in it
    // main part of the post
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

                {/* the module button to allow it to be displayed */}
                <TouchableOpacity
                    onPress={ () => setModalVisibility(true) }
                >
                    <MaterialCommunityIcons 
                        name='dots-horizontal'
                        size={20}
                    />
                </TouchableOpacity>

                <Text> {currentPost.title } </Text>
                <Text> {currentPost.description} </Text>
                <Text> {currentPost.blood_type} </Text>
                <Text> {currentPost.city} </Text>
                <Text> {currentPost.until_donation} </Text>
                <Text>---------- comments ----------------</Text>
            </>
        )
    }

    // comment section
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

    

    return (

        <View>
            <FlatList 
                    data={currentPost.comments}
                    keyExtractor={item => item._id}
                    renderItem={renderComment}
                    //static header can make it as a function
                    ListHeaderComponent={header}
                    ListFooterComponent = { footer()}

                />

            {/* repeated module from main page (not proud of what i did lmao) */}
            <Modal
                    visible = {modalVisibility}
                    animationType='slide'
                    presentationStyle='overFullScreen'
                    transparent={true}
                    
                >
                    <View style={styles.modalContainer} >
                        <View style={styles.functionContainer} >

                            {/* showing buttons depending on ownership and role in the server */}
                            
                            {   
                                ( user.role === "admin" || user._id === currentPost.posted_by._id ) &&
                                (
                                <TouchableOpacity
                                    onPress={() => handleDeletePost() }
                                >
                                    <MaterialCommunityIcons 
                                        name='delete'
                                        size={20}
                                        color={'red'}
                                    />
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                                
                                
                                )
                            }

                            {
                                user._id === currentPost.posted_by._id && (

                                    <TouchableOpacity
                                        onPress={() => handleEditPost() }
                                    >
                                        <MaterialCommunityIcons 
                                            name='pencil'
                                            size={20}
                                            color={'black'}
                                        />
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                )
                            }

                            {
                                (   
                                    ( user.role === "admin" || user._id !== currentPost.posted_by._id ) &&
                                    <TouchableOpacity
                                        onPress={() => handleReportPost() }
                                    >
                                        <MaterialCommunityIcons
                                            name='alert-octagon'
                                            size={20}
                                            color={'red'}
                                        />
                                        <Text>Report</Text>
                                    </TouchableOpacity>
                                )
                            }

                            <TouchableOpacity
                                onPress={() => setModalVisibility(false) }
                            >
                                <MaterialCommunityIcons
                                    name='close'
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>                                 
                    </View>
                </Modal>

        </View>
            
            
        
    )
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

export default SinglePost