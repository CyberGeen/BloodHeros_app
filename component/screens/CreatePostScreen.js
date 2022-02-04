import React , {useContext , useEffect , useState } from 'react'
import { ScrollView } from 'react-native';
import  * as Yup from 'yup'
import moment from 'moment';
import AppForm from './../form/AppForm';
import AppFormField from './../form/AppFormField';
import AppSubmitButton from '../form/AppSubmitButton';

//----------json imports------
import jsonBlood from '../json/bloodType.json'
import jsonCities from '../json/cities.json' 
import jsonTag from '../json/tags.json'

import PostContext from './../context/PostContext';

currentDate = moment().format('YYYY-MM-DD')

//Yup schema
const schema = Yup.object().shape({
    title :  Yup.string().required('Title is required').label('Title'),
    description : Yup.string().required('Description is required').label('Description') ,
    blood_type : Yup.string().required('Blood type is required').label('Blood Type') ,
    tags : Yup.string().required('Tag is required').label('Tags') ,
    city : Yup.string().required('City is required').label('City') ,
    until_donation : Yup.string().label('Date Of need')
})
//initial values
// to reset :  
const initVal0 = {
    title:'' ,
    description:'' ,
    blood_type :'' ,
    tags:'' ,
    city:'' ,
    until_donation : ''
}
// used if we are on edit mode
let initVal = {
    title:'' ,
    description:'' ,
    blood_type :'' ,
    tags:'' ,
    city:'' ,
    until_donation : ''
}


const CreatePostScreen = ({route , navigation }) => {

    const {setPosts} = useContext(PostContext)
    // indicating the mode wether we are editing or creating a post
    const [editMode, setEditMode] = useState(false);

    //form submit handler
    const handleSubmit = (data) => {
        setPosts(data , 'SUBMIT_POST' )
        initVal = initVal0
        navigation.navigate('main')
    }


    // handling post edition if there is : 
    const handlePostEdit = (data) => {
        setPosts({id:route.params.id , data } , 'EDIT_POST' )
        //changing back to the main funcionality of creating a post
        initVal = initVal0
        setEditMode(false)
        // cleaning the state of Formik
        // returning to the main post we wanted to edit
        navigation.navigate('single' , {id : route.params.id } )
    }

    // if a post calls for edits we change the state of Formik to the post one
    useEffect(  () => {
        if(route.params){
            setEditMode(true)
            initVal = route.params.state
        }
        //update every call -> every change of route params
    }  , [route.params] )

    return (
        <ScrollView>
            <AppForm
                initialValues={initVal}
                handleSubmit={(val)=> {
                    if(!editMode){
                        return handleSubmit(val)
                    }
                    return handlePostEdit(val)
                } }
                schema={schema}
            >
                <AppFormField
                    type='text'
                    name='title'
                    iconName='book'
                    label='Title :'
                    placeholder='Title...'
                />
                <AppFormField
                    type='text'
                    name='description'
                    iconName='card-text-outline'
                    label='Description :'
                    placeholder='explain your needs...'
                    multiline={true}
                    numberOfLines={6}
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
                <AppFormField 
                    type='date'
                    label='Enter The Date you need Donation :'
                    name='until_donation'
                    minDate={currentDate}
                />
                <AppSubmitButton 
                    label={
                            editMode ? 'Submit' : 'Create Post' 
                        }
                />
            </AppForm>
        </ScrollView>
    )
}

export default CreatePostScreen
