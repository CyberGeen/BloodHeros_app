import React from 'react'
import { View, Text } from 'react-native'

const Test2 = ({route}) => {
    return (
        <View>
            <Text>THEY DROP THEY DROP and {route.params.test} </Text>
        </View>
    )
}

export default Test2
