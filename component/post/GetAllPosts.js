import React , {useContext} from 'react'
import { View, Text , FlatList , Button } from 'react-native'
import PostContext from './../context/PostContext';

const GetAllPosts = ({navigation}) => {
    const {posts , setPosts} = useContext(PostContext)
    return(
        <View>
            <Text>{posts}</Text>
            <Button title='goto a post' onPress={()=>{navigation.navigate('single', {posts})}} />
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

export default GetAllPosts
