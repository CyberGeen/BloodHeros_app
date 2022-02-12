import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'

const MainUiParams = ({navigation}) => {
  return (
    <>
        <TouchableOpacity
            onPress={() => navigation.navigate('user') }
        >
            <Text>Go to Profile Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('edit') }
        >
            <Text>Account Information</Text>
        </TouchableOpacity>

        {/* on press show a modal confirming logout */}
        <TouchableOpacity
            onPress={() => navigation.navigate('logout') }
        >
            <Text>Logout</Text>
        </TouchableOpacity>
    </>
  )
}

export default MainUiParams