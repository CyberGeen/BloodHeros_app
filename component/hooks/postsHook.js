import {useState} from 'react'

function postsHook(data) {
     const [posts, setPosts] = useState(data)
    
    return {posts , setPosts }
}

export default postsHook
