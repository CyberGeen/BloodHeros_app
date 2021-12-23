import React , {useContext  , useEffect } from 'react'
import { View, Text , FlatList , TouchableOpacity } from 'react-native'
import PostContext from './../context/PostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppInput from '../form/AppInput';

const SinglePost = ({route}) => {
    const {setPosts , posts} =  useContext(PostContext)
    let currentPost = posts.find( post => post._id === route.params.id )
    
    const handleCommentChange = async (data) => {
        console.log(data)
    }
    const renderComment = ({item:comment}) => {
        return(
            <View>
                <Text> by : {comment.postedBy.name} </Text>
                <Text>{comment.content.trim()}</Text>
            </View>
        )
    }

    //values needed for updating color state of vote
    const up = setPosts(route.params.id , 'CHECK_UP')
    const down = setPosts(route.params.id , 'CHECK_DOWN')

    return (
        <View>
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
            <FlatList 
                data={currentPost.comments}
                keyExtractor={item => item._id}
                renderItem={renderComment}
            /> 
            <AppInput 
                iconName={'comment'}
                placeholder={'say something nice...'}
                onPress={()=>console.log('yeet')}
            >
            
            <View>
                <TouchableOpacity>
                <MaterialCommunityIcons 
                name='send-circle-outline'
                size={30}
                style={{flexDirection: "row" , paddingTop : 20 , paddingRight: 10 }}
                color={'grey'}
            />
                </TouchableOpacity>
            </View>
            
            </AppInput>
            
        </View>
    )
}

export default SinglePost

/* 
<FlatList 
                data={currentPost.comments}
                keyExtractor={}
            /> */