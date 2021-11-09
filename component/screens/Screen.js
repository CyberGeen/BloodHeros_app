import React from 'react'
import { View , StyleSheet } from 'react-native'

import  Constants  from 'expo-constants'


const Screen = ({children , style}) => {
    return (
        <View style = {[styles.screen , style]} >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    screen : {
        //fix the problem of elements showing inside nutification bar
        paddingTop : Constants.statusBarHeight , 
        flex : 1
    }
})

export default Screen
