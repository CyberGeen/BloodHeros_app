import {useState , useEffect} from 'react'
import {getUser} from '../../services/httpService'
import {vote} from  '../../services/httpPostService'


function postsHook() {
    //getting the id once only , preventing multiple calls
    const [user , setUser] = useState()
    const [posts, stateHandler] = useState()
    useEffect( ()=>{
        getUser().then( (res ) => {
            setUser(res)
        } ).catch( (err)=>console.log(err) )
    } , [] )
    const setPosts = (data , type='') => {
        /* 
            optimistic aproach : update state -> call backend ? do nothing : reverse changes
        */
        switch (type) {
            //--------------------VOTE SECTION--------------------
            case 'UP':
                const oldPost = posts
                console.log(checkUpVotes(data))
                handleVote(data)
                console.log(checkUpVotes(data))
                vote(data , 'U')
                    .then((res) => console.log(res.data))
                    .catch(() => setPosts(oldPost) )
                //setPosts(oldPost)
                
                break;


            case 'DOWN':
                const oldPost2 = posts
                console.log(checkDownVotes(data))
                handleVote(data , 'down')
                console.log(checkDownVotes(data))
                vote(data , 'D')
                .then((res) => console.log(res.data))
                .catch(() => setPosts(oldPost2) )
                //setPosts(oldPost2)


                break;
            case 'CHECK_UP':
                    return checkUpVotes(data)
                break;

            case 'CHECK_DOWN':
                    return checkDownVotes(data)
                break;

                //---------------REPORT SECTION-------------------
            case 'EDIT_POST':
                
                break;
            case 'DELETE_POST':
                
                break;
                //---------------COMMENT SECTION------------------
            case 'ADD_COMMENT':
                
                break;
            case 'DELETE_COMMENT':
                
                break;
            default: 
                    stateHandler(data)
                break;
        }
    }

    //----------------get post------------------------------
    const getPost = (id) => {
        return posts.find(post => post._id === id);
    }

    //---------------secondary vote handlers----------------
    const handleVote =  (data , type) => {
        let tempPosts = posts
        let mainIndex = 'up_votes' 
        let reverseIndex = 'down_votes'
        if(type === 'down'){
            mainIndex = 'down_votes'
            reverseIndex = 'up_votes'
        } 
            tempPosts = tempPosts.map((post) => {
                if(post._id === data){
                    //-----------------do logic----------------------
                    //check ups ? delete up delete down : add up delete down
                    let main = post[mainIndex].find(up => up._id === user._id ) ? true : false
                    if(!main){
                        post[mainIndex].push({_id:user._id})
                        if(post[reverseIndex].length > 0){
                            post[reverseIndex] = post[reverseIndex].filter((vote) => vote._id !== user._id)
                        }
                    }else{
                        if(post[mainIndex].length > 0){
                            post[mainIndex] = post[mainIndex].filter((vote) => vote._id !== user._id)
                        }
                        if(post[reverseIndex].length > 0){
                            post[reverseIndex] = post[reverseIndex].filter((vote) => vote._id !== user._id)
                        }
                    }
                    post.ud_rate = post.up_votes.length - post.down_votes.length 
                }
                return post
            } )
            setPosts(tempPosts)
    }
    //************* checking if voted************//
    const checkUpVotes = (postId) => {
        const post = getPost(postId)
        if(!post.up_votes.length === 0 ) return false
        return post.up_votes.find(up => up._id === user._id ) ? true : false
    }
    const checkDownVotes = (postId) => {
        const post = getPost(postId)
        if(post.down_votes.length === 0) return false
        return post.down_votes.find(up => up._id === user._id ) ? true : false
    }
   
    //************* adding vote************//
    const addUpVote = (postId) => {
        
    }
    const addDownVote = (postId) => {
        
    }
    // --------------------- Main Return Statement ----------------------
    return {posts , setPosts }
}

export default postsHook
