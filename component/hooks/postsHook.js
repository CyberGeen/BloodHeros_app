import {useState , useEffect} from 'react'
import {getUser} from '../../services/httpService'
import {deleteComment, deletePost, editPost, postPost, reportPost, vote} from  '../../services/httpPostService'


function postsHook() {
    //getting the id once only , preventing multiple calls
    const [user , setUser] = useState()
    // posts state
    const [posts, stateHandler] = useState()
    // search data state
    const [searchData , setSearchData] = useState({
        title : '' ,
        blood_type :'' ,
        tags:'' ,
        city:'' ,
        isReported : ''
    })
    // old posts state
    const [oldPosts, setOldPosts] = useState(posts);
    useEffect( ()=>{
        getUser().then( (res ) => {
            setUser(res)
        } ).catch( (err)=>console.log(err) )
    } , [] )

    // showing posts depending on search value
    useEffect ( () => {
        //search logic : 
        if(!oldPosts){
            setOldPosts(posts)
        }
        let newPostsSL = oldPosts 
        if(searchData.blood_type){
            newPostsSL = newPostsSL.filter( (post) => {post.blood_type == searchData.blood_type} )
        }
        if(searchData.tags){
            newPostsSL = newPostsSL.filter( (post) => post.tags == searchData.tags )
        }
        if(searchData.city){
            
            newPostsSL = newPostsSL.filter( (post) => post.city == searchData.city )
        }
        if(searchData.isReported){
            newPostsSL = newPostsSL.filter( (post) => post.isReported === true )
        }
        if(searchData['sort']){
            //merge sort
            newPostsSL = flexDevidingMerg(newPostsSL)
        }
        // lef last because the most demanding
        if(searchData.title){
            newPostsSL = newPostsSL.filter((post)=>post.title.toLowerCase().includes(searchData.title.toLowerCase()) )
        }

        setPosts(newPostsSL)

    } , [searchData] )


    // merg sorting posts
    const flexDevidingMerg = (arr) => { 
        if (arr.length <= 1){
          return arr;
        } 
        const middle = Math.floor(arr.length/2)
        const left = arr.slice(0 , middle)
        const right = arr.slice(middle)
        return MergeSort(  flexDevidingMerg(left) , flexDevidingMerg(right)  )
    }
    const MergeSort = (left , right) => {
        const arr=[] ;
        const key = searchData.sort 
        switch (key) {
          case 'new':
            //compare the date of publishing
           while(left.length && right.length){
             if(left[0].data < right[0].date ){
                arr.push(left.shift())
             }else{
                arr.push(right.shift())
             }
           }
            break;    
          default:
           while(left.length && right.length){
             if(left[0].ud_rate > right[0].ud_rate ){
                arr.push(left.shift())
             }else{
                arr.push(right.shift())
             }
           }
            break;
        }
       //quite once one is umpty => there is one var left concat it with the rest
       return arr.concat(left.concat(right))
     } 

     
    const setPosts = (data , type='') => {
        /* 
            implimentation used mostly in all state handling :
                optimistic aproach : update state -> call backend ? do nothing : reverse changes
        */
        switch (type) {
            //--------------------VOTE SECTION--------------------
            case 'UP':
                const oldPost = posts
                handleVote(data)
                vote(data , 'U')
                    .catch(() => setPosts(oldPost) )
                break;


            case 'DOWN':
                const oldPost2 = posts
                handleVote(data , 'down')
                vote(data , 'D')
                .catch(() => setPosts(oldPost2) )
                break;

            case 'CHECK_UP':
                    return checkUpVotes(data)

            case 'CHECK_DOWN':
                    return checkDownVotes(data)

            case 'EDIT_POST':
                    const oldPostEP = posts
                    const newPostsEP = posts.map( (post) => {
                        if(post._id === data.id ){
                            post.title = data.data.title
                            post.description = data.data.description
                            post.blood_type = data.data.blood_type
                            post.tags = data.data.tags
                            post.until_donation = data.data.until_donation
                        }
                        return post
                    } )
                    editPost(data.data , data.id )
                        .then( (res) => {
                            // FIXME: show post edited notif
                            setPosts(newPostsEP)
                        } )
                        .catch( (err) => {
                            //FIXME: show post network error
                            setPosts(oldPostEP)
                            console.log(err)
                        } )
                break;

            case 'DELETE_POST':
                const oldPostDP = posts
                const newPostsDP = posts.filter( post => post._id !== data )
                deletePost(data)
                    .then( () => {
                        setPosts(newPostsDP)
                    } )
                    .catch( (err) => {
                        //FIXME: further notice of offline and server erreur 
                        console.log(err)
                        setPosts(oldPostDP)
                    } )
                break;
            
                //---------------REPORT SECTION-------------------
            case 'REPORT_POST':
                reportPost(data)
                .catch( (err) => console.log(err))
            break;

            //--------------Searching--------------------------
            case 'REPORT_MODE':
                if(data){
                    setSearchData({...searchData , isReported:true})
                    break;
                }
                setSearchData({...searchData , isReported:false})
            break;

            case 'SEARCH_POST':
                setSearchData({...searchData , ...data})
            break;
                    
                //--------------submitting a post------------------
            case 'SUBMIT_POST':
                postPost(data)
                    .then( (res) => {
                        let tempPostsSP = posts
                        tempPostsSP.push(res.data)
                        setPosts( tempPostsSP )
                    } )
                    .catch((err) => {
                        //FIXME: show net erreur nutif
                        console.log(err)
                    })
            break;
                //---------------COMMENT SECTION------------------
            case 'ADD_COMMENT':
                // changed the implimentation to be handled inside the main funtion (signlePost)
                break;

            case 'DELETE_COMMENT':
                const oldPostDC = posts
                handleDeleteComment(data)
                deleteComment(data.postId , data.commentId)
                    .then()
                    .catch((err) => {
                        //FIXME: show offline notification
                        console.log(err)
                        setPosts(oldPostDC)
                    } )
                break;
            default: 
                    stateHandler(data)
                    if(!oldPosts){
                        setOldPosts(data)
                    }
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
   
    //---------------------- Delete Comment -----------------------------
    const handleDeleteComment = (data) => {
        const {postId , commentId} = data
                const newPosts = posts.map( (post) => {
                    if(post._id === postId){
                        post.comments = post.comments.filter( comment => comment._id !== commentId )
                    }
                    return post
                } )
            setPosts(newPosts)
    }

    
    // --------------------- Main Return Statement ----------------------
    return {posts , setPosts }


    
}

export default postsHook
