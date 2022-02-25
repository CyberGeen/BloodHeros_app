import React , {useEffect , useRef} from 'react'
import { View , Text , StyleSheet , TouchableOpacity } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable'
import CreatePostScreen from '../screens/CreatePostScreen'
import PostNav from './PostNav';
import postsHook from '../hooks/postsHook';
import PostContext from '../context/PostContext';
import ParameterScreen from './../screens/ParameterScreen';
import Icon from '../common/Icon';


const Tab = createBottomTabNavigator();

const TabButton = ({props , label , focused , revFocused }) => {
    //console.log(props)
    let isFocused = props.accessibilityState.selected
    //console.log(props.accessibilityState.selected)
    //console.log(isFocused)

    let viewRef = useRef(null)
    let mainRef = useRef(null)
    let labelRef = useRef(null)
    let tabRef = useRef(null)

    useEffect(()=>{
        if(label === 'Home' ){
            if(isFocused){
                mainRef.current.animate( {0:{scale : 0.5 , translateX : 5  } , 1 : {scale:1 , translateX : -15  } } )
                viewRef.current.animate( {0:{scale : 0.7   } , 1 : {scale:1  } } )
                labelRef.current.transitionTo({scale : 1})
                tabRef.current.animate({0:{scale : 0.7   } , 1 : {scale:1   }})

                return;
            }
            else {
                mainRef.current.animate( {0:{scale : 1 , translateX: -15  } , 1 : {scale:0.7 , translateX : 0  } } )
                labelRef.current.transitionTo({scale : 0})
                //viewRef.current.animate( {0:{scale : 1.2} , 1 : {scale:0.7} } )
                return;
            }
        }
        if(isFocused){
            mainRef.current.animate( {0:{scale : 0.7 , translateX : 0  } , 1 : {scale:1 , translateX : -15  } } )
            viewRef.current.animate( {0:{scale : 0 , rotate : '0deg' } , 1 : {scale:1 , rotate : '720deg' } } )
            labelRef.current.transitionTo({scale : 1})
            tabRef.current.animate({0:{scale : 0.7   } , 1 : {scale:1   }})
        }
        else {
            mainRef.current.animate( {0:{scale : 1 , translateX : -15  } , 1 : {scale:0.7 , translateX : 0  } } )
            labelRef.current.transitionTo({scale : 0})
            //viewRef.current.animate( {0:{scale : 1.2} , 1 : {scale:0.7} } )
        }
    },[isFocused])

    return(
        <Animatable.View
        ref={tabRef}
        animation={'tada'}
        duration={600}
            style={[styles.tabContainer , {
            backgroundColor : isFocused ? '#D10000' : 'black'  ,
        } ]}
        >
        <View style={[styles.tabContainer]} >


            <TouchableOpacity
                onPress={ props.onPress }
            >
            <View style = {
                {
                    alignItems : 'center' ,
                    alignContent : 'center' ,
                    justifyContent : 'center' ,
                    flexDirection : 'row' ,
                    flex : 1 ,
                }
             } >
                <Animatable.View
                    ref={mainRef}
                    duration={500}
                    style = {styles.tabSelected}
                >
                    <Animatable.View
                        ref={viewRef}
                        animation={"zoomIn"}
                        duration={400}
                        style = {styles.tabSelected}
                    >
                        <Icon
                            name = {isFocused ? focused : revFocused }
                            color = {isFocused ? '#D10000' : "white" }
                        />
                    </Animatable.View>
                </Animatable.View>
                <Animatable.View
                    animation={"lightSpeedIn"}
                    ref={labelRef}
                    duration={400}
                    style={styles.tabLabelContainer}
                >
                    {/* will ruin the flex view if now set to umpty .. took me 2 days to figure it out */}
                   <View>
                   <Text style={styles.tabLabelContainer} >{isFocused ? label : '' }</Text>
                   </View>
                </Animatable.View>
                </View>
            </TouchableOpacity>
        </View>
        </Animatable.View>
    )
}

const MainNav = () => {
    const {posts , setPosts} = postsHook()
    return (
        <PostContext.Provider value={{posts , setPosts} } >
             <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerShown:false,
                        tabBarStyle: styles.tabBarMain


                        }}
                        initialRouteName = "home"

                >
                    <Tab.Screen name="create post" component={CreatePostScreen}
                        options={{
                            tabBarShowLabel : false ,
                            tabBarLabel : "Create Post" ,
                            tabBarButton : (props) =>
                            <TabButton
                                props={props}
                                focused="plus-thick"
                                revFocused="plus-outline"
                                label="Create"
                             />
                        }}
                     />
                    <Tab.Screen name="home" component={PostNav}
                        options={{
                            tabBarShowLabel : false ,
                            tabBarLabel : "Home" ,
                            tabBarButton : (props) =>
                            <TabButton
                                props={props}
                                focused="home-variant"
                                revFocused="home-variant-outline"
                                label = "Home"
                             />

                        }}
                     />
                    <Tab.Screen name="Parameter" component={ParameterScreen}
                        options={{
                            tabBarShowLabel : false ,
                            tabBarLabel : "Parameters" ,
                            tabBarButton : (props) =>
                            <TabButton
                                props={props}
                                focused="cog"
                                revFocused="cog-outline"
                                label="Settings"
                             />
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </PostContext.Provider>
    )
}
export default MainNav

const styles = StyleSheet.create({
    tabBarMain : {
        flexDirection : 'row' ,
        flex : 1 ,
        position : 'absolute' ,
        alignItems : 'center' ,
        alignContent : 'center' ,
        height : 40 ,
        backgroundColor : 'black' ,
        borderRadius : 15 ,
        marginBottom : 2 ,
        marginHorizontal : 2
    }
    ,
    tabContainer : {
        flexGrow : 1 ,
        height : 40 ,
        paddingBottom : 2 ,
        alignItems : 'center' ,
        alignContent : 'center' ,
        flexDirection : 'row' ,
        justifyContent : 'center' ,
        borderRadius : 15 , 
        paddingTop : 2 ,
    } ,
    tabSelected : {
        flex :0 ,
        width : 36 ,
        height : 36 ,
        alignContent : 'center' ,
        alignItems : 'center' ,
        borderRadius : 18 ,
        borderWidth : 1.5 ,
        borderColor : 'white' ,
        backgroundColor : 'black' ,
        justifyContent : 'center' ,
        flexGrow:1 , 
        
    } ,
    tabLabelContainer : {

        flexGrow:1,
        fontSize: 20,
        fontWeight: "bold"
    }
})
/*
const styles = StyleSheet.create({
    tabBarMain : {
        flexDirection : 'row' ,
        flex : 1 ,
        position : 'absolute' ,
        height : 50 ,

        justifyContent : 'space-around' ,
        alignContent : 'space-around' ,
        backgroundColor : 'tomato' ,
    }
    ,
    tabContainer : {
        flex : 1 ,
        flexDirection : 'row' ,
        alignItems : 'center' ,
        alignContent : 'center' ,
        flexGrow : 1 ,

    } ,
    tabSelected : {
        flex : 1 ,
        flexDirection : 'row' ,
        alignItems : 'center' ,
        justifyContent : 'center' ,
        width : 40 ,
        height : 40 ,
        borderRadius : 20 ,
        borderWidth : 2 ,
        borderColor : 'black' ,
        backgroundColor : 'red' ,
    } ,
    tabLabelContainer : {
        flex : 1 ,
        flexGrow : 1 ,
       justifyContent : 'center'
    }
})

*/









/*
tabBarIcon : ({focused}) => {
                                return(<Icon
                                    name={ focused ? 'plus-thick' : 'plus-outline' }
                                    color = 'black'
                                 />)
                            } ,
                            */





/*

tabBarMain : {
        flex : 1 ,
        position : 'absolute' ,
        height : 60 ,
        alignItems : 'center' ,
        alignContent : 'space-around'
    }
    ,
    tabContainer : {
        flex : 1 ,
        alignItems : 'center' ,
        alignContent : 'space-between' ,



    } ,
    tabSelected : {
        width : 40 ,
        height : 40 ,
        borderRadius : 20 ,
        borderWidth : 2 ,
        borderWidth : 2 ,
        borderColor : 'black' ,
        backgroundColor : 'red' ,
        justifyContent : 'space-evenly' ,
        alignItems : 'center'
    } ,
    tabLabelContainer : {
        marginTop : -15 ,
        flex : 1 ,

        margin : 6
    }

*/
