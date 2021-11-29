import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AppInput from "./component/form/AppInput";
import AppPicker from "./component/form/AppPicker";
import Screen from "./component/screens/Screen";
import jsonBlood from "./component/json/bloodType.json";
import AppTimePicker from "./component/form/AppTimePicker";
import AppButton from "./component/form/AppButton";
import { Formik } from "formik";
import * as Yup from "yup";
import AppForm from "./component/form/AppForm";
import AppFormField from "./component/form/AppFormField";
import AppSubmitButton from "./component/form/AppSubmitButton";
import moment from "moment";
import LoginScreen from "./component/screens/LoginScreen";
import SignUpScreen from "./component/screens/SignUpScreen";
import CreatePostScreen from "./component/screens/CreatePostScreen";
import AuthNav from "./component/navigations/AuthNav";
import { NavigationContainer } from "@react-navigation/native";
import { getUser } from "./services/httpService";
import MainNav from "./component/navigations/MainNav";
import UserContext from "./component/context/UserContext";
import userHook from "./component/hooks/userHook";
currentDate = moment().format("YYYY-MM-DD");

export default function App() {
  const [input, setInput] = useState("");
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    email2: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    blood: Yup.string().required("reeeq"),
    date: Yup.string().required("qsdqsd"),
  });

  const { user, setUser } = userHook();

  const gettingUser = async () => {
    try {
      const userToken = await getUser();
      setUser(userToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingUser();
  }, []);
  if (!user) {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <AuthNav />
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <MainNav />
      </UserContext.Provider>
    );
  }
  return (
    <Screen>
      {/* <AppForm
        initialValues={{email:'' , blood:''}}
        handleSubmit={(val)=>{console.log(val)}}
        schema={schema}
      >
        <AppFormField 
          type='text'
          name='email'
          iconName='email'
          label='email here'
          placeholder='enter ur email'
        />
        <AppFormField 
          type='text'
          name='email2'
          iconName='email'
          label='email here'
          placeholder='enter ur email'
        />
        <AppFormField 
          type='dropDown'
          object={jsonBlood}
          name='blood'
          placeholder="idk ma dude"
        />
        <AppFormField 
          type='date'
          name='date'
          maxDate={currentDate}
        />
        
        <AppSubmitButton label='Do IT' />
      </AppForm> */}
    </Screen>
  );
}
//style={styles.container}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
