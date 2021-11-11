import React from 'react'
import { View, Text } from 'react-native'
import AppButton from './AppButton'
import { useFormikContext } from 'formik'

const AppSubmitButton = ({label}) => {
    const {handleSubmit} = useFormikContext()
    return (
        <AppButton handleClick={handleSubmit} label={label} />
    )
}

export default AppSubmitButton
