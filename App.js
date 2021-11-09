import  React , {useState} from 'react';
import { StyleSheet, Text, View , TextInput } from 'react-native';
import AppInput from './component/form/AppInput';
import Screen from './component/screens/Screen';

export default function App() {
  const [input, setInput] = useState('')
  return (
    <Screen  style={styles.container} >
      <Text>test</Text>
        <AppInput onChangeText={setInput} name="idk ma dude" iconColor='white' iconName='email' 
         />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
