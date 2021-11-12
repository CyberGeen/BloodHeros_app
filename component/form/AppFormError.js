import React from 'react'
import { View, Text , StyleSheet } from 'react-native'

const AppFormError = ({error , touched }) => {
    if(touched && error){
        return (
            <View>
                <Text style={styles.text} > {error} </Text>
            </View>
        )
    }
    return null
}

const styles = StyleSheet.create({
    text:{
        color : 'red'
    }
})

export default AppFormError
