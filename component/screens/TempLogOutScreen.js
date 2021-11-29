import React , {useContext} from 'react'
import { View, Button } from 'react-native'
import { logout } from '../../services/httpUserService'

const TempLogOutScreen = () => {
    const {setUser} = useContext(UserContext)
    const handleLoggout =async () => {
        await logout()
        setUser(null)
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
