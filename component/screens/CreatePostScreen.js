import React from 'react'
import  * as Yup from 'yup'
import moment from 'moment';
import AppForm from './../form/AppForm';
import AppFormField from './../form/AppFormField';
import AppSubmitButton from '../form/AppSubmitButton';

//----------json imports------
import jsonBlood from '../json/bloodType.json'
import jsonCities from '../json/cities.json' 
import jsonTag from '../json/tags.json'

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
const initVal = {
    title:'' ,
    description:'' ,
    blood_type :'' ,
    tags:'' ,
    city:'' ,
    until_donation : ''
}
//form submit handler
const handleSubmit = async (data) => {
    console.log(data)
}


const LoginScreen = () => {
    
    return (
        <>
            <AppForm
                initialValues={initVal}
                handleSubmit={(val)=>handleSubmit(val)}
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
                    label='Create Post'
                />
            </AppForm>
        </>
    )
}

export default LoginScreen
