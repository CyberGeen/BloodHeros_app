import { View, Text , TouchableOpacity , StyleSheet } from 'react-native'
import React , {useState , useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'

const MainUiParams = ({navigation}) => {
    // permission state
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    
    


    const askCammeraPermission = () => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync()
            setHasCameraPermission(status === 'granted')
            if(status === 'granted' ){
                navigation.navigate('scanQr')
            }
            console.log(status)
        } )()
    }



  return (
    <View style={{marginTop : 35}} >
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

        <TouchableOpacity
            onPress={ () => {
                if(hasCameraPermission){
                    return navigation.navigate('scanQr')
                }
                    askCammeraPermission()
                } }
        >
            <Text>Scan user Qr</Text>
        </TouchableOpacity>

        {/* on press show a modal confirming logout */}
        <TouchableOpacity
            onPress={() => navigation.navigate('logout') }
        >
            <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}



export default MainUiParams