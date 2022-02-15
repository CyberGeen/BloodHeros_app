import React, { useContext } from 'react'
import  * as Yup from 'yup'
import AppForm from './../form/AppForm';
import AppFormField from './../form/AppFormField';
import AppSubmitButton from '../form/AppSubmitButton';
import { ScrollView } from 'react-native';
import {login} from '../../services/httpUserService'
import UserContext from '../context/UserContext';

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



const LoginScreen = () => {
    //form submit handler
    const {setUser} = useContext(UserContext)
    const handleSubmit = async (data) => {
        try {
            const res = await login(data)
            if(res === null){
                //FIXME: throw an error
                return;
            }
           setUser(res)
        } catch (err) {
            console.log(err)
        }
    }
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
