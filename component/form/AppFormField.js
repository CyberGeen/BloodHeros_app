import React from 'react'
import { Text , StyleSheet } from 'react-native'
import AppInput from './AppInput'
import AppPicker from './AppPicker'
import AppTimePicker from './AppTimePicker'
import { useFormikContext } from 'formik'
import AppFormError from './AppFormError'


const AppFormField = ({type='text' ,label , name , placeholder , iconColor , iconName , object , ...otherProps }) => {
    const {handleChange , values , errors , touched , setFieldTouched} = useFormikContext()
    
    if(type=='text'){
        return (
            <> 
                <Text>{label}</Text>
                <AppInput
                    value={values[name]} 
                    onChangeText={handleChange(name)} 
                    placeholder={placeholder} 
                    iconColor={iconColor} 
                    iconName={iconName} 
                    onBlur={()=>setFieldTouched(name)}   
                    {...otherProps}
                />
                <AppFormError 
                    error={errors[name]}
                    touched={touched[name]}
                />
            </>
        )
    }
    else if (type=='date'){
        return (
            <>
                <Text>{label}</Text>
                <AppTimePicker 
                    value={values[name]}
                    handleChange={handleChange(name)}
                    onBlur={()=>setFieldTouched(name)} 
                    {...otherProps}
                />
                <AppFormError 
                    error={errors[name]}
                    touched={touched[name]}
                />
            </>
        )
    }
    else if (type=='dropDown') {
        return (
            <> 
                <Text>{label}</Text>
                <AppPicker 
                    object={object}
                    handleChange={handleChange(name)}
                    value={values[name]}
                    onBlur={()=>setFieldTouched(name)} 
                    placeholder={placeholder}
                    {...otherProps}
                />
                <AppFormError 
                    error={errors[name]}
                    touched={touched[name]}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default AppFormField
