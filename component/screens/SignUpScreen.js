import React from 'react'
import  * as Yup from 'yup'
import moment from 'moment';
import AppForm from './../form/AppForm';
import AppFormField from './../form/AppFormField';
import AppSubmitButton from '../form/AppSubmitButton';

//----------json imports------
import jsonBlood from '../json/bloodType.json'
import jsonCities from '../json/cities.json' 
import jsonGender from '../json/gender.json'
import { ScrollView } from 'react-native';

currentDate = moment().format('YYYY-MM-DD')

//Yup schema
const schema = Yup.object().shape({
    email :  Yup.string().email('Must be a valid email').required('Email is required').label('Email'),
    password : Yup.string().required('Password is required').label('Password') ,
    name: Yup.string().required('Name is required').label('Name').min(3) ,
    gender : Yup.string().required('Gender is required').label('Gender') ,
    city : Yup.number().required('City is required').label('City') ,
    blood_type : Yup.string().required('Blood type is required').label('Blood type') ,
    last_donation: Yup.string().label('Last Donation') ,
    //this 2 vals will be nested in emergency_info
    emergencyCall : Yup.number('enter a valid number').label('Emergency Number').typeError('Enter a valid number') ,
    emergencyInfo : Yup.string().label('Emergency Information')
})
//initial values
const initVal = {
    name:'' ,
    password:'' ,
    email : '' ,
    gender : '' ,
    city : '' ,
    blood_type : '' ,
    last_donation: '' ,
    //this 2 vals will be nested in emergency_info
    emergencyCall : '' ,
    emergencyInfo : ''
}
//form submit handler
const handleSubmit = async (data) => {
    try {
        //const newUser = {emergency_info:{emergencyCall:data.emergencyCall , emergencyInfo} , ...data} = data
        let {emergencyCall , emergencyInfo , ...rest} = data
        data = {emergency_info:{emergencyCall , emergencyInfo} , ...rest} 
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}


const SignUpScreen = () => {
    
    return (
        <ScrollView>
            <AppForm
                initialValues={initVal}
                handleSubmit={(val)=>handleSubmit(val)}
                schema={schema}
            >
                <AppFormField
                    type='text'
                    name='name'
                    iconName='card-account-details-outline'
                    label='Name :'
                    placeholder='enter your name'
                />
                <AppFormField
                    type='text'
                    name='email'
                    iconName='email'
                    label='Email :'
                    placeholder='enter your email'
                />
                <AppFormField
                    type='text'
                    name='password'
                    iconName='lock'
                    label='Password :'
                    placeholder='enter your password'
                    secureTextEntry={true}
                />
                <AppFormField 
                    label='Gender :'
                    type='dropDown'
                    object={jsonGender}
                    name='gender'
                    placeholder="Select your Gender..."
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
                    type='date'
                    label='Last Donation :'
                    name='last_donation'
                    maxDate={currentDate}
                />
                <AppFormField
                    type='text'
                    name='emergencyCall'
                    iconName='phone'
                    label='Emergency Number :'
                    placeholder='0X-XXXX-XXXX'
                    keyboardType="numeric"
                />
                <AppFormField
                    type='text'
                    name='emergencyInfo'
                    iconName='car-brake-alert'
                    label='Emergency infomations :'
                    placeholder='enter things you want your doctor to know in case of emergency ...'
                    multiline={true}
                    numberOfLines={4}
                />
                <AppSubmitButton 
                    label='Sign up'
                />
            </AppForm>
        </ScrollView>
    )
}

export default SignUpScreen
