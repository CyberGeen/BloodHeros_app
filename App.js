import  React , {useState} from 'react';
import { StyleSheet, Text, View , TextInput } from 'react-native';
import AppInput from './component/form/AppInput';
import AppPicker from './component/form/AppPicker';
import Screen from './component/screens/Screen';
import jsonBlood from './component/json/bloodType.json'
import AppTimePicker from './component/form/AppTimePicker';


export default function App() {
  const [input, setInput] = useState('')
  return (
    <Screen  style={styles.container} >
      <Text>test</Text>
      <AppTimePicker  value={input} handleChange={setInput} />
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

//<AppInput onChangeText={setInput} name="idk ma dude" iconColor='white' iconName='email' />
//<AppPicker value={input} handleChange={setInput} object={jsonBlood} />
