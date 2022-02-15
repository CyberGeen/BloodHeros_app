import React , {useContext} from 'react'
import { View, Button } from 'react-native'
import { logout } from '../../services/httpUserService'

const TempLogOutScreen = () => {
    const {setUser} = useContext(UserContext)
    const handleLoggout =async () => {
        try {
            await logout()
            setUser(null)
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <Button
                onPress={handleLoggout}
                title="loggout"
                />
        </View>
    )
}

export default TempLogOutScreen
