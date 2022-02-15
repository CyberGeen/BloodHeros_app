import {callApi , deleteApi, getApi , getUser , putApi , setDefaultHeader } from './httpService'
import {setStoreToken , deleteStoreToken} from './store'

const url = 'user/'

const login = async (data) => {
    const res = await callApi(data , url + 'login' )
    return setToken(res) 
}

const signUp = async (data) => {
    return setToken(await callApi(data , url + 'signup' ))
}

const editUser = async (data) => {
    return await putApi( url + 'update' , data )
} 

const setToken = async (res) => {
    try {
        //if the status is okey we should save the token
        if (res.status === 202 || res.status === 201 ){
            await setStoreToken(res.headers['x-auth-token'])
            await setDefaultHeader()
            //returning null because the promise is resolved 
            return await getUser()
    }
    //else we return the error obj to be handled as an error msg/popUp 
    else {
        return res
    }
    } catch (error) {
        console.log(error)
    }
}

//get user
const getUserPage = async() => {
    return await getApi(url + 'me')
}

//logout , delete token from store
const logout = async () => {
    try {
        return await deleteStoreToken()
    } catch (error) {
        console.log(error)
    }
}

//general info
const getGeneralUserInfo = async(userId) => {
    return await getApi(url + 'general/' + userId )
}

const deleteAccount = async(data)  => {
    return await deleteApi(url + 'delete' , data )
}

export {
    login ,
    signUp ,
    getUserPage ,
    logout ,
    getGeneralUserInfo ,
    editUser ,
    deleteAccount ,
}

