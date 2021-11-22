import React from 'react'
import { View, StyleSheet} from 'react-native'
import { Picker } from '@react-native-picker/picker'

const AppPicker = ({value , handleChange , object , placeholder  }) => {
    object = Object.entries(object)
    if(value !== 'ligma' && value !== ''){
        object = object.filter((obj)=>obj[1]!=='ligma')
    }else{
        object.unshift(["ligma" , placeholder])
    }
    object = object.map( (obj) => {
        if(obj[0] == 'ligma'){
            return <Picker.Item label={obj[1]} value={obj[0]} key={obj[1]} color='black' />
        }
        return (
            <Picker.Item label={obj[1]} value={obj[0]} key={obj[1]} color='red' />
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

