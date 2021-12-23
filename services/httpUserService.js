import {callApi , getApi , getUser} from './httpService'
import {setStoreToken , deleteStoreToken} from './store'

const url = 'user/'

const login = async (data) => {
    const res = await callApi(data , url + 'login' )
    return setToken(res) 
}

const signUp = async (data) => {
    return setToken(await callApi(data , url + 'signup' ))
}

const setToken = async (res) => {
    //if the status is okey we should save the token
    if (res.status === 202 || res.status === 201 ){
         await setStoreToken(res.headers['x-auth-token'])
         //returning null because the promise is resolved 
         return await getUser()
    }
    //else we return the error obj to be handled as an error msg/popUp 
    else {
        return res
    }
}

//get user
const getUserPage = async() => {
    return await getApi(url + 'me')
}

//logout , delete token from store
const logout = async () => {
    await deleteStoreToken()
}

//general info
const getGeneralUserInfo = async(userId) => {
    return await getApi(url + 'general/' + userId )
}

export {
    login ,
    signUp ,
    getUserPage ,
    logout ,
    getGeneralUserInfo ,
}

