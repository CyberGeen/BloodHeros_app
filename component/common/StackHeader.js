import {  TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StackHeader = ({navigation , route} ) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(route)} style={{marginRight : 10}} >
        <MaterialCommunityIcons 
                name='undo-variant'
                size = {25} 
                color = 'cyan'
           />
    </TouchableOpacity>
  )
};

export default StackHeader;
