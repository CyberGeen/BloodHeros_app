import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Icon = ({name , color , size=20 ,style}) => {
  return (
    
      <MaterialCommunityIcons
        name={name}
        color={color}
        size={size}
        style={style}
       />
    
  )
}

export default Icon