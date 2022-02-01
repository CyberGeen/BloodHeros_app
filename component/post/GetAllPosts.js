import React , {useContext , useEffect , useState} from 'react'
import { View, Text , FlatList , Button, ScrollView, TouchableOpacity , Modal , StyleSheet } from 'react-native'
import PostContext from './../context/PostContext';
import UserContext from '../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const GetAllPosts = ({navigation}) => {


    const {posts , setPosts} = useContext(PostContext)

    // user data used in identifying post owner
    const {user} = useContext(UserContext)

    //modal visibility state
    const [modalVisibility, setModalVisibility] = useState(false);
    
    // indicating the current post thats being open in the modal , to not show invalid props
    const [currentPostOwner, setCurrentPostOwner] = useState('');

    // indicating the current post id - needed in posts deletion and report 
    const [currentPostId, setCurrentPostId] = useState('');

    // handle the setting up of the current post owner and the visibility of the modal
    const handleModelPopUp = (data) => {
        setCurrentPostOwner(data.posted_by._id)
        setCurrentPostId(data._id)
        setModalVisibility(true)
    }

    // set up for the flat list to show the posts 
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
                <TouchableOpacity
                    onPress={ () => handleModelPopUp(post)}
                >
                    <MaterialCommunityIcons 
                        name='dots-horizontal'
                        size={20}
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

    // handle deleting post : 

    const handleDeletePost = () => {
        setPosts(currentPostId , 'DELETE_POST' )
        setModalVisibility(false)
        //FIXME: add reported animation
    }

    // handle reporting a post :
    
    const handleReportPost = () => {
        setPosts(currentPostId , 'REPORT_POST' )
        setModalVisibility(false)
        //FIXME: add reported animation
    }

    // main return : 
    return(
        
            <View>
            <FlatList
                data={posts}
                renderItem={renderPostUi}
                keyExtractor={item => item._id}
            />
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
                            ( user.role === "admin" || user._id === currentPostOwner ) &&
                            (<TouchableOpacity
                                onPress={() => handleDeletePost() }
                            >
                                <MaterialCommunityIcons 
                                    name='delete'
                                    size={20}
                                    color={'red'}
                                />
                                <Text>Delete</Text>
                            </TouchableOpacity>)
                        }

                        {
                            (   
                                ( user.role === "admin" || user._id !== currentPostOwner ) &&
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

const styles = StyleSheet.create({
    modalContainer : {
        flex : 1 ,
        justifyContent : 'flex-end' ,
        alignItems : 'baseline'
    } , 
    functionContainer : {
        backgroundColor : 'grey' ,
        flexDirection : 'column' ,
        
    }
})

/* 
    <Text>{posts}</Text>
                <Button title='goto a post' onPress={()=>{navigation.navigate('single', {posts})}} />
*/

export default GetAllPosts
