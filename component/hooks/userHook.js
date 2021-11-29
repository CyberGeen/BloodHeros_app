import React , {useState , useEffect} from 'react'

function userHook() {
     const [user, setUser] = useState()
    
    return {user , setUser }
}

export default userHook
