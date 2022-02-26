import { View, Text , StyleSheet , TouchableOpacity , ScrollView } from 'react-native'
import React , {useState,useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { getEmergencyData } from '../../services/httpUserService'

import jsonCities from '../json/cities.json'
import StackHeader from './../common/StackHeader';

const ScanUserQr = ({navigation}) => {
  //QrCode holder
  const [QrCode, setQrCode] = useState(null)
  //if scanned indicateur
  const [scanned, setScanned] = useState(false)
  // data holder
  const [data, setData] = useState(null)
  // error holder
  const [errorHolder, setErrorHolder] = useState(null)

  useEffect( () => {
    //fetch only when not null
    if(QrCode){
      
      getEmergencyData(QrCode)
        .then( (res) => {
          //console.log(res.response.data)
          if( res.response &&  (res.response.status === 404 )  ){
            //console.log(res.response.data.message)
            setErrorHolder(true)
            setScanned(false)
            return ;
          }
          //console.log(res.data)
          setData(res.data)
        } )
        .catch( (err) => {
          console.log(err)
          //FIXME: net erreur
        } )
    }
  } , [QrCode] )

  useEffect( () => {
    navigation.setOptions({
      headerLeft : () => { return (<StackHeader navigation={navigation} route="main" /> )}
  })
  } )

  const handleBarCodeScan = ({data}) => {

    if(data){
      setScanned(true)
      setQrCode(data)
    }
  } 

  const handleScanAgain = () => {
    setScanned(false)
    setQrCode(null)
    setData(null)
  }

  const handleDataUi = () => {
    if(errorHolder){
      return(
        <>
          <Text>User Not Found</Text>
        </>
      )
    }
    return(
      <ScrollView>
        <Text style={styles.maintext} >name : {data.name} </Text>
        <Text style={styles.maintext} >blood type : {data.blood_type} </Text>
        {data.emergency_info && <Text style={styles.maintext} >emergency info : {data.emergency_info.emergencyInfo} </Text>}
       { data.emergency_info && data.emergency_info.emergencyCall &&
            <Text style={styles.maintext} >call incase of emergency : {data.emergency_info.emergencyCall} </Text>
                 }
        <Text style={styles.maintext} >city : {jsonCities[data.city]} </Text>
      </ScrollView>
    )
  }

  return (
    <View style={styles.container} >
      <View style={styles.barcodebox} >
        <BarCodeScanner 
          style={{height:400 , width: 400}}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScan }
        />
      </View>
      {
        (data || errorHolder ) && handleDataUi()
      }
      {scanned && (
        <TouchableOpacity 
        onPress={handleScanAgain}
        style={styles.scanButton}
       >
        <Text  style={styles.maintext} >Scan Again ?</Text>
      </TouchableOpacity>)
      }
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 7,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 240,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    } ,
    scanButton : {
      backgroundColor: 'tomato' , 
      marginVertical : 7 ,
      marginHorizontal : 80 ,
      borderRadius : 15
    },
})

export default ScanUserQr