import React , {useContext , useEffect , useState} from 'react'
import { View, Text , FlatList , Button, ScrollView, TouchableOpacity , Modal , StyleSheet } from 'react-native'
import PostContext from './../context/PostContext';
import UserContext from '../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// ---------- search element imports ----------- 

//----------json imports------
import jsonBlood from '../json/bloodType.json'
import jsonCities from '../json/cities.json' 
import jsonTag from '../json/tags.json'

// form elements
import AppForm from './../form/AppForm';
import AppFormField from './../form/AppFormField';
import AppSubmitButton from '../form/AppSubmitButton';

import  * as Yup from 'yup'
import { Constants } from 'expo-constants';

const schema = Yup.object().shape({
    title :  Yup.string().label('Title'),
    blood_type : Yup.string().label('Blood Type') ,
    tags : Yup.string().label('Tags') ,
    city : Yup.string().label('City') ,
    sort : Yup.string().label('Sort') ,
})

let initVal = {
    title : '' ,
    blood_type :'' ,
    tags:'' ,
    city:'' ,
    sort : 'ud'
}

// clearing the search state
const initVal0 = {
    title : '' ,
    blood_type :'' ,
    tags:'' ,
    city:'' ,
    sort : 'ud' ,
}

const GetAllPosts = ({navigation}) => {


    const {posts , setPosts} = useContext(PostContext)

    // user data used in identifying post owner
    const {user} = useContext(UserContext)

    //post modal visibility state
    const [modalVisibility, setModalVisibility] = useState(false);

    //search modal visibility
    const [searchModalVisibility, setSearchModalVisibility] = useState(false);

    // indicating if we are in reports mode , used to change back to original posts later 
    const [reportsMode, setReportsMode] = useState(false);

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

    //FIXME:
    //handle showing reports
    const handleShowingReports = () => {
        setSearchModalVisibility(false)
        if(reportsMode){
            // return back the original posts state
            //quiting the function
            setReportsMode(false)
            setPosts(false,'REPORT_MODE')
        }else{
            setPosts(true,'REPORT_MODE')
            setReportsMode(true)
        }
    }

    //handle search
    const handleSearchPost = (data) => {
        initVal = data
        setSearchModalVisibility(false)
        setPosts(data , 'SEARCH_POST' )
    }

    // header for the list -> searching UI

    // main header ui handler
    const mainHeader = () => {
        return (
            <>
                <TouchableOpacity
                    onPress={ () => setSearchModalVisibility(true)}
                >
                    <MaterialCommunityIcons
                        name='magnify'
                        size={20}
                    />
                </TouchableOpacity>
            </>
        )
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

    // object comparing
    const isEqual = (obj1 , obj2) => {
        // 1 - they both exist 
        // 2 - both objects 
        // 3 - both got the same length
        // 4 - every index of an object deeply equals the other object value
        let areTheyEqual = true
        Object.keys(obj1).forEach(key => areTheyEqual = areTheyEqual &&  obj1[key] === obj2[key])
        return (obj1 && obj2 && typeof(obj1)==='object' && typeof(obj2)==='object' && obj1.length === obj2.length &&
            areTheyEqual 
        )
    } 


    // main return :
    return(

            <View>
            <FlatList
                ListHeaderComponent = {mainHeader}
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
            {/* search modal */}
            <Modal
                visible = {searchModalVisibility}
                animationType='slide'
            >
                <View>  
                        <ScrollView>
                            {/* closing UI element */}
                            <TouchableOpacity
                                onPress={() => setSearchModalVisibility(false) }
                            >
                                <MaterialCommunityIcons
                                    name='close'
                                    size={20}
                                />
                            </TouchableOpacity>
                            {/* clearing search state */}
                            {   
                                ! isEqual(initVal , initVal0) && (
                                    <Text>wssaaaaap</Text>
                                )
                            }
                            {/* search elements */}
                            <AppForm
                                handleSubmit={(val) => handleSearchPost(val) }
                                schema={schema}
                                initialValues={initVal}
                            >
                                <AppFormField
                                    label='Sort By :'
                                    type='dropDown' 
                                    object={{ud:"Best" , new:"Newest" }}
                                    name='sort'
                                />
                                <AppFormField
                                    type='text'
                                    name='title'
                                    iconName='text-search'
                                    label='Search :'
                                    placeholder='search post title...'
                                />
                                <AppFormField
                                    label='Blood Type :'
                                    type='dropDown' 
                                    object={jsonBlood}
                                    name='blood_type'
                                    placeholder="Select your Blood type..."                                                                         
                                />
                                <AppFormField 
                                    label='City :'
                                    type='dropDown'
                                    object={jsonCities}
                                    name='city'
                                    placeholder="Select your city..."
                                />
                                <AppFormField 
                                    label='Tag :'
                                    type='dropDown'
                                    object={jsonTag}
                                    name='tags'
                                    placeholder="Select a tag..."
                                />
                                <AppSubmitButton 
                                    label={'Search'}
                                />
                            </AppForm>
                            {/* show this only to admins */}
                            {user.role === "admin" &&
                                (<TouchableOpacity
                                    onPress={ handleShowingReports }
                                >
                                    {!reportsMode && (<View style={styles.searchModalReportContainer} >
                                        <Text>Show Reports</Text>

                                        <MaterialCommunityIcons 
                                            name='alert'
                                            color={'red'}
                                            size={20}
                                        />
                                    </View>)}
                                    {reportsMode && (
                                        <View style={styles.searchModalGoBackContainer} >
                                        <MaterialCommunityIcons 
                                            name='backspace-outline'
                                            color={'black'}
                                            size={20}
                                        />
                                        <Text>Exit Reports</Text>

                                    </View>
                                    )
                                    }
                                </TouchableOpacity>)
                            }
                        </ScrollView>
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

    } ,
    searchModalReportContainer : {
        flexDirection : 'row' ,
        backgroundColor : 'pink' ,
        alignItems : 'center' ,
        justifyContent : 'center' ,
        borderRadius : 25 ,
        marginHorizontal : 80
    } ,
    searchModalGoBackContainer : {
        flexDirection : 'row' ,
        backgroundColor : 'cyan' ,
        alignItems : 'center' ,
        justifyContent : 'center' ,
        borderRadius : 25 ,
        marginHorizontal : 120
    } ,
})

/*
    <Text>{posts}</Text>
                <Button title='goto a post' onPress={()=>{navigation.navigate('single', {posts})}} />
*/

export default GetAllPosts
