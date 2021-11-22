import React from 'react'
import { View , StyleSheet , ScrollView  } from 'react-native'

import  Constants  from 'expo-constants'


const Screen = ({children , style}) => {
    return (
        <ScrollView>
            <View style = {[styles.screen , style]} >
                {children}
            </View>
        </ScrollView>
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
