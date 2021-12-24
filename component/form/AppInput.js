import React from 'react'
import { View, TextInput , Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"

const AppInput = ({ onChangeText , placeholder , iconName , iconColor , containerStyle , iconStyle , children , ...otherProps}) => {
    return (
        <View style={[styles.container , containerStyle]} >
            {   
                //add padding and spacing only when there is an icon
                iconName && 
                    <MaterialCommunityIcons 
                    name={iconName} 
                    size={30}
                    style={styles.icon}
                    color={iconColor}
            />
            }
            <TextInput 
                style={[styles.input , iconStyle]} 
                onChangeText={onChangeText} 
                placeholder={placeholder} 
                //put other props dynamicly
                {...otherProps}
             />
              {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection: "row" ,
        borderRadius: 10, 
        backgroundColor : 'lightgrey' ,
        margin : 10
    } ,
    input : {
        flex : 1 ,
        margin: 12,
        padding: 10,
    } ,
    icon:{
        padding : 20
    }
})

export default AppInput
