import React from 'react'
import  * as Yup from 'yup'
import AppForm from './../form/AppForm';
import AppFormField from './../form/AppFormField';
import AppSubmitButton from '../form/AppSubmitButton';
import { ScrollView } from 'react-native';

//Yup schema
const schema = Yup.object().shape({
    email :  Yup.string().email('Must be a valid email').required('Email is required').label('Email'),
    password : Yup.string().required('Password is required').label('Password')
})
//initial values
const initVal = {
    email:'' ,
    password:''
}
//form submit handler
const handleSubmit = async (data) => {
    console.log(data)
}


const LoginScreen = () => {
    
    return (
        <ScrollView>
            <AppForm
                initialValues={initVal}
                handleSubmit={(val)=>handleSubmit(val)}
                schema={schema}
            >
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
                <AppSubmitButton 
                    label='Sign in'
                />
            </AppForm>
        </ScrollView>
    )
}

export default LoginScreen
