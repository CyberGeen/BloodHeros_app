import React from 'react'
import { View,Text , StyleSheet} from 'react-native'
import { Picker } from '@react-native-picker/picker'

const AppPicker = ({value , handleChange , object , placeholder  }) => {
    object = Object.entries(object)
     object.unshift([placeholder,"ligma"])
    if(value !== 'ligma' && value !== ''){
        object = object.filter((obj)=>obj[1]!=='ligma')
    }
    object = object.map( (obj) => {
        if(obj[1] == 'ligma'){
            return <Picker.Item label={obj[0]} value={obj[1]} key={obj[0]} color='black' />
        }
        return (
            <Picker.Item label={obj[0]} value={obj[1]} key={obj[0]} color='red' />
        )
    } )
    return (
        <View style = {styles.container}>
            <Picker 
                style = {styles.picker} 
                selectedValue = { value }
                onValueChange = {(val) => handleChange(val)}
                mode = 'dropdown'
                dropdownIconColor= 'red' 
             >
              {object}             
            </Picker>
        </View>
    )
}


/*
    TODO: for more styles check
https://github.com/react-native-picker/picker 
    TODO: to style the drop down thing you should use native android *
https://www.semicolonworld.com/question/49063/how-to-style-the-standard-react-native-android-picker

*/



const styles = StyleSheet.create({
    container:{
        flexDirection: "row" ,
        borderRadius: 10, 
        backgroundColor : 'lightgrey' ,
        margin : 10
    }
    ,
    picker : {
        flex : 1 ,
        margin: 12,
        padding: 10,
    } ,
    pickerList : {
        backgroundColor :'red'
    }

})


export default AppPicker

