import React , {useState} from 'react'
import { View , StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'

const AppTimePicker = ({value , handleChange , styleContainer , styleMain , ...otherProps}) => {
    const [state, setstate] = useState('')
    return (
        <View style = {[styles.container , styleContainer]}>
        <DatePicker
            style={[styles.main , styleMain]}
            date={value}
            mode="date"
            placeholder="select date..."
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
            dateInput: {
                marginLeft: 36
                , borderWidth: 0
            },
            
            }}
            onDateChange={(date) => {handleChange(date)}}
            useNativeDriver={true}
            {...otherProps}
      />
        </View>
    )
}

// TODO: for more props https://www.npmjs.com/package/react-native-datepicker

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row' ,
        
    },
    main : {
        flexDirection: 'column' ,
        borderRadius: 10, 
        backgroundColor : 'lightgrey' ,
        margin : 10 ,
        
        
    }
})

export default AppTimePicker
