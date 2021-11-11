import  React , {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AppInput from './component/form/AppInput';
import AppPicker from './component/form/AppPicker';
import Screen from './component/screens/Screen';
import jsonBlood from './component/json/bloodType.json'
import AppTimePicker from './component/form/AppTimePicker';
import AppButton from './component/form/AppButton';
import { Formik } from 'formik';
import * as yup from 'yup'
import AppForm from './component/form/AppForm';
import AppFormField from './component/form/AppFormField';
import AppSubmitButton from './component/form/AppSubmitButton';

export default function App() {
  const [input, setInput] = useState('')
  return (
    <Screen  style={styles.container} >
      <Text>test</Text>
      <AppForm
        initialValues={{email:''}}
        handleSubmit={(val)=>{console.log(val)}}
      >
        <AppFormField 
          type='text'
          name='email'
          iconName='email'
          label='email here'
          placeholder='enter ur email'
        />
        <AppFormField 
          type='dropDown'
          object={jsonBlood}
          name='blood'
        />
        <AppFormField 
          type='date'
          name='date'
        />
        
        <AppSubmitButton label='Do IT' />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  } 

});
//<AppTimePicker  value={input} handleChange={setInput} />
//<AppInput onChangeText={setInput} name="idk ma dude" iconColor='white' iconName='email' />
//<AppPicker value={input} handleChange={setInput} object={jsonBlood} />
//<AppButton label="bu2en mate" handleClick={() => console.log("pressed")} />
/* <AppInput onChangeText={handleChange('email')} name="email" iconColor='white' iconName='email' />
            <AppButton label="bu2en mate" handleClick={handleSubmit} /> */

/* <Formik
          onSubmit={(val) => console.log(val)}
          initialValues={{email:''}}
        >
          {({handleSubmit , handleChange}) => {
            return(
              <>
              <AppInput onChangeText={handleChange('email')} name="email" iconColor='white' iconName='email' />
            <AppButton label="bu2en mate" handleClick={handleSubmit} />
              </>
            )
          }}
      </Formik>
      */