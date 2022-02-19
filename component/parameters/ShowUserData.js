import { View, Text , TouchableOpacity , FlatList , Modal  } from 'react-native'

import React , {useEffect , useState  }  from 'react'
import { getUserPage } from '../../services/httpUserService'
import {getPosts} from '../../services/httpPostService'
import QRCode from 'react-native-qrcode-svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import cityJson from '../json/cities.json'

const ShowUserData = ({navigation}) => {

  // loading indicator
  const [loadingData, setLoadingData] = useState(true)
  // loading indicator for user posts
  const [loadingPosts, setLoadingPosts] = useState(true)
  // storing general data to show here
  const [userData, setUserData] = useState(null)
  // storing user posts 
  const [userPosts, setUserPosts] = useState(null)
  // modal state
  const [QrModal, setQrModal] = useState(false)


  useEffect( () => {
    getUserPage()
      .then( (res) => {
        setUserData(res.data)
        setLoadingData(false)
      } )
      .catch(err =>{
        console.log(err)
        //FIXME: show server error
        } )
  } , [] )

  // getting the posts by id and showing the UI of a simplified post that send them to the actual post in main

  useEffect( () => {
    if(userData){
      let newPosts = []
      userData.posts.forEach(post => {
        getPosts(post).then( (res) => {
          newPosts.push(res.data)
          if(newPosts.length === userData.posts.length ){
            setUserPosts(newPosts)
            setLoadingPosts(false)
          }
        } )
        
      });
    }
  } , [userData] )

  const handleSaveQr = () => {
    ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
  }

  const renderUserData = () => {
    return(
      <>
      <TouchableOpacity
       onPress={() => setQrModal(true)}
      >
        <QRCode value={userData._id} />
      </TouchableOpacity>
        <Text>name : {userData.name} </Text>
        <Text>blood type : {userData.blood_type} </Text>
        <Text>points : {userData.score} </Text>
        <Text>last donation : {userData.last_donation ? userData.last_donation : 'never' } </Text>
        <Text>should verify email ? : {userData.verified?'true':'false'} </Text>
        <Text>city : {cityJson[userData.city]}  </Text>
        <Text>-----------------------------------</Text>
      </>
    )
  }
  const renderUserPosts = () => {
    if(userData.posts.length === 0 ){
      return(<>
        <Text>no posts here .. try posting something </Text>
      </>)
    }
    if(loadingPosts){
      return(
        <>
          <Text>Loading</Text>
        </>
      )
    }
    
    if(userPosts.length !== 0 ){
      return(
        
            <View>
              <FlatList
                data={userPosts}
                keyExtractor={item => item._id}
                renderItem = { ({item}) => {
                  return(<>
                    <TouchableOpacity
                      onPress = { () => navigation.navigate('single' , { id : item._id}) }
                    >
                      <Text>{item.title}</Text>
                    </TouchableOpacity>
                  </>)
                }  }
              />
            </View>
          
      )
    }



    
 


}

  


  if(loadingData){
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <View>
      {renderUserData()}
      {renderUserPosts()}
      <Modal
        visible={QrModal}
      >
        <TouchableOpacity onPress={() => {
          setQrModal(false)        
          }
          }>
          <MaterialCommunityIcons name="close" size={20} />
          
        </TouchableOpacity>
        <QRCode value={userData._id} />
      </Modal>
    </View>
  )

}

export default ShowUserData