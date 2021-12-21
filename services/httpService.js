import axios from 'axios'
import config from '../component/json/config.json'
import jwtDecode from 'jwt-decode'
import { getStoreToken  , deleteStoreToken } from './store'

//api url
const apiUrl = config.apiUrl

//get token 
const getJWT = async () => {
    return await getStoreToken()
}

//sending token everytime we need to as a default header in every CRUD operation
let setter = 0
const setDefaultHeader = async () => {
    try {
        axios.defaults.headers.common['x-auth-token'] = await getJWT() 
        //make sure this executes only once on the launch
        setter++
    } catch (err) {
        console.log(err)
    }
}
if(setter === 0) {
    setDefaultHeader()
}
//universall post function
const callApi = async (data , url) => {
    try {
        const res = await axios.post( apiUrl + url , data)
        return(res)
    } catch (error) {
        return (error)
    }
}

const getApi = async (url) => {
    try {
        const res = await axios.get( apiUrl + url)
        return(res)
    }
    catch (error) {
        return (error)
    }
}

const deleteApi = async (url) => {
    try {
        const res = await axios.delete( apiUrl + url)
        return(res)
    }
    catch (error) {
        return (error)
    }
}

//put api
const putApi = async (url , data = null) => {
    try {
        const res = await axios.put( apiUrl + url , data)
        return(res)
    } catch (error) {
        return (error)
    }
}

//get user attribut
const getUser = async () => {
    try {
        const token = await getJWT()
        if( token !== null ) {
            return await jwtDecode(token)
        }
        return null
    } catch (error) {
        console.log(error)
    }
}

//delete user store 
const deleteUser = async () => {
    try {
        await deleteStoreToken()
    } catch (error) {
        console.log(error)
    }
}


//exports 
export {
    callApi ,
    getUser ,
    getApi , 
    deleteApi ,
    putApi ,
    deleteUser
}

