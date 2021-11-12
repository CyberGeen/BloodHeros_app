import React from 'react'
import AppButton from './AppButton'
import { useFormikContext } from 'formik'

const AppSubmitButton = ({label}) => {
    const {handleSubmit , errors} = useFormikContext()
    return (
        <AppButton handleClick={handleSubmit} label={label} disabled={Object.keys(errors).length} />
    )
}

export default AppSubmitButton
