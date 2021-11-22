import {callApi , getApi} from './httpService'
import {setStoreToken} from './store'

const url = 'user/'

const login = async (data) => {
    return setToken(await callApi(data , url + 'login' )) 
}

const signUp = async (data) => {
    return setToken(await callApi(data , url + 'signup' ))
}

const setToken = async (res) => {
    //if the status is okey we should save the token
    if (res.status === 202 || res.status === 201 ){
         await setStoreToken(res.headers['x-auth-token'])
         //returning null because the promise is resolved 
         return null
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


export {
    login ,
    signUp ,
    getUserPage ,
    
}

