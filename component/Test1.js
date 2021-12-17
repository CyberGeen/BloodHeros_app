import React from 'react'
import { View, Text , TouchableOpacity , Button } from 'react-native'

const Test1 = ({navigation}) => {
    return (
        <View>
            <Button 
                onPress={()=>{
                navigation.navigate({name:'Tet' , params : {test: "fuck off"}})}}
                title="test for now" />
        </View>
    )
}

export default Test1
