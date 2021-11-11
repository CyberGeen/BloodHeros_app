import React from 'react'
import { View, Text } from 'react-native'
import AppInput from './AppInput'
import AppPicker from './AppPicker'
import AppTimePicker from './AppTimePicker'
import { useFormikContext } from 'formik'


const AppFormField = ({type='text' ,label , name , placeholder , iconColor , iconName , object , ...otherProps }) => {
    const {handleChange , values} = useFormikContext()
    if(type=='text'){
        return (
            <> 
                <Text>{label}</Text>
                <AppInput 
                    onChangeText={handleChange(name)} 
                    placeholder={placeholder} 
                    iconColor={iconColor} 
                    iconName={iconName}    
                    {...otherProps}
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
                    {...otherProps}
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
                    {...otherProps}
                />
            </>
        )
    }
    
}

export default AppFormField
