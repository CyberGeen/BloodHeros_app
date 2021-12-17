import {useState } from 'react'

function userHook() {
     const [user, setUser] = useState()
    
    return {user , setUser }
}

export default userHook
