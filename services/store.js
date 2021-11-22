import * as SecureStore from 'expo-secure-store'

const key = "BhToken"

//store token
const setStoreToken = async (token) => {
    try {
       await SecureStore.setItemAsync( key , token ) 
    } catch (error) {
        console.log(error)
    }
}

//get store Token
const getStoreToken = async () => {
    try {
        return  await SecureStore.getItemAsync( key )        
    } catch (error) {
        return null
    }
}

//delete store token
const deleteStoreToken = async () => {
    try {
        await SecureStore.deleteItemAsync( key )
    } catch (error) {
        console.log(error)
    }
}

export {
    setStoreToken ,
    getStoreToken ,
    deleteStoreToken
}