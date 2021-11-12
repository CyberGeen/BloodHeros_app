import React from 'react'
import { View, Text } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

const AppForm = ({initialValues , handleSubmit , schema , children}) => {
    return (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={schema}
        >
          {() => {
            return(
              <>
                {children}
              </>
            )
          }}
      </Formik>
    )
}

export default AppForm
