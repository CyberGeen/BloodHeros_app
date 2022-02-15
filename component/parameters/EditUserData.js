import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import React, { useState, useEffect , useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { editUser, getUserPage , deleteAccount , logout } from "../../services/httpUserService";

// form imports
import * as Yup from "yup";
import AppForm from "../form/AppForm";
import AppFormField from "../form/AppFormField";
import AppSubmitButton from "../form/AppSubmitButton";

import jsonBlood from "../json/bloodType.json";
import jsonCities from "../json/cities.json";
import jsonGender from "../json/gender.json";
import UserContext from './../context/UserContext';

let initVal = {
  name: "",
  password: "",
  email: "",
  gender: "",
  city: "",
  blood_type: "",
  //this 2 vals will be nested in emergency_info
  emergencyCall: "",
  emergencyInfo: "",
};

const initValPass = {
  password : "" ,
  newPassword : "" ,
  newPasswordConfirmation : "" ,
}

const initValDel = {
  password : ""
}


const schema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required")
    .label("Email"),
  password: Yup.string().required("Password is required").label("Password"),
  name: Yup.string().required("Name is required").label("Name").min(3),
  gender: Yup.string().required("Gender is required").label("Gender"),
  city: Yup.number().required("City is required").label("City"),
  blood_type: Yup.string()
    .required("Blood type is required")
    .label("Blood type"),
  //this 2 vals will be nested in emergency_info
  emergencyCall: Yup.number("enter a valid number")
    .label("Emergency Number")
    .typeError("Enter a valid number"),
  emergencyInfo: Yup.string().label("Emergency Information"),
});

const passwordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").label("Password"),
  newPassword: Yup.string().required("Password is required").label("New Password"),
  newPasswordConfirmation: Yup.string().required("Password is required").label("New Password Confirmation"),

})

const delAccSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").label("Password"),
})

const EditUserData = () => {
  // handles the poping of the data edition modal
  const [datamodal, setDataModal] = useState(false);
  // handles the new password modal
  const [newPassModal, setNewPassModal] = useState(false);
  // handles the delete acc confirmation modal
  const [deleteAccmodal, setDeleteAccModal] = useState(false);

  // data handlers
  const [initDataEdit, setInitDataEdit] = useState(null);
  // handle storing aditional errors in edtion 
  const [editDataError, setEditDataError] = useState(null)

  // loading indicateur of editUser while getting user data
  const [dataLoad, setDataLoad] = useState(false);




    //------------------------------ handle submiting edits-------------------
  //getting user data when loading is set to true
  useEffect(() => {
    // only get data when its true
    if (dataLoad) {
      getUserPage()
        .then((res) => {
          setInitDataEdit(res.data);
          //set initial value
        })
        .catch((err) => {
          console.log(err);
          //FIXME: show server erreur message
        });
    }
  }, [dataLoad]);

  // we start making changes once the state is updated
  useEffect(() => {
    // apply changes when the data is actually initialised not in it null state
    if (initDataEdit) {
      setDataLoad(false);
      initVal = {
        name: initDataEdit.name,
        password: "",
        email: initDataEdit.email,
        gender: initDataEdit.gender,
        city: initDataEdit.city,
        blood_type: initDataEdit.blood_type,
        emergencyCall: initDataEdit.emergency_info?initDataEdit.emergency_info.emergencyCall:null,
        emergencyInfo: initDataEdit.emergency_info?initDataEdit.emergency_info.emergencyInfo:null,
      };
    }
  }, [initDataEdit]);


  const handleSubmitEdits = (data) => {
    let { emergencyCall, emergencyInfo, ...rest } = data;
    data = { emergency_info: { emergencyCall, emergencyInfo }, ...rest };
    editUser(data)
      .then( (res) => {
          //handle errors in case of used email or wrong password
          if( res.response &&  res.response.status === 400 ){
          //console.log(res.response.data.message)
          setEditDataError(res.response.data.message)
          return ;
        }
        // close modal if data is saved successfully 
        setDataModal(false)
        // clear errors if there is any
        if(editDataError !== null ){
          setEditDataError(null)
        }
      } )
      .catch( (err) => {
        console.log(err)
        //FIXME: show server erreur
      } )
  };

  const renderEditDataUi = () => {
    if (dataLoad) {
      return (
        <>
          <Text>Loading</Text>
        </>
      );
    }
    return (
      <>
        <ScrollView>
          <AppForm
            initialValues={initVal}
            schema={schema}
            handleSubmit={(data) => handleSubmitEdits(data)}
          >
            <AppFormField
              type="text"
              name="name"
              iconName="card-account-details-outline"
              label="Name :"
              placeholder="enter your name"
            />
            <AppFormField
              type="text"
              name="email"
              iconName="email"
              label="Email :"
              placeholder="enter your email"
            />
            <AppFormField
              label="Gender :"
              type="dropDown"
              object={jsonGender}
              name="gender"
              placeholder="Select your Gender..."
            />
            <AppFormField
              label="Blood Type :"
              type="dropDown"
              object={jsonBlood}
              name="blood_type"
              placeholder="Select your Blood type..."
            />
            <AppFormField
              label="City :"
              type="dropDown"
              object={jsonCities}
              name="city"
              placeholder="Select your city..."
            />
            <AppFormField
              type="text"
              name="emergencyCall"
              iconName="phone"
              label="Emergency Number :"
              placeholder="0X-XXXX-XXXX"
              keyboardType="numeric"
            />
            <AppFormField
              type="text"
              name="emergencyInfo"
              iconName="car-brake-alert"
              label="Emergency infomations :"
              placeholder="enter things you want your doctor to know in case of emergency ..."
              multiline={true}
              numberOfLines={4}
            />
            <AppFormField
              type="text"
              name="password"
              iconName="lock"
              label="Password for confirmation :"
              placeholder="enter your password "
              secureTextEntry={true}
            />
            {
              editDataError && (
                <>
                <Text> {editDataError} </Text>
                </>
              )
            }
            <AppSubmitButton label="Save Changes" />
          </AppForm>
        </ScrollView>
      </>
    );
  };

// ---------------------------- handle new password --------------------

  const handleSubmitNewPass =  (data) => {
    if(data.newPassword !== data.newPasswordConfirmation ){
      setEditDataError('password confirmation doesnt match')
      return ;
    }
    editUser({password : data.password , newPassword : data.newPassword })
      .then( (res)=>{
        //handle errors in case of used email or wrong password
        if( res.response &&  res.response.status === 400 ){
          //console.log(res.response.data.message)
          setEditDataError(res.response.data.message)
          return ;
        }
        // close modal if data is saved successfully 
        setNewPassModal(false)
        // clear errors if there is any
        if(editDataError !== null ){
          setEditDataError(null)
        }
      })
  }


  const renderNewPassUi = () => {
    return(
      <AppForm
        initialValues={initValPass}
        schema = {passwordSchema}
        handleSubmit = {(data)=> handleSubmitNewPass(data) }
      >
      <AppFormField
              type="text"
              name="password"
              iconName="lock"
              label="Old Password :"
              placeholder="enter your password "
              secureTextEntry={true}
            />
            <AppFormField
              type="text"
              name="newPassword"
              iconName="lock"
              label="new Password :"
              placeholder="enter your new Password "
              secureTextEntry={true}
            />
            <AppFormField
              type="text"
              name="newPasswordConfirmation"
              iconName="lock"
              label="Confirme new password :"
              placeholder="enter your password confirmation "
              secureTextEntry={true}
            />
            {
              editDataError && (
                <>
                  <Text> {editDataError} </Text>
                </>
              )
            }
        <AppSubmitButton label="Save Changes" />
      </AppForm>
    )
  }

  // -------------------------- handle delete acc ------------------
  const {setUser} = useContext(UserContext)
  
  const handleDeleteAccount = (data) => {
    // pass the password and clear states
    //console.log(data)
    deleteAccount(data)
      .then( (res)=>{
        if( res.response &&  res.response.status === 400 ){
          setEditDataError(res.response.data.message)
          return ;
        }
        //loggout and clear the states
        if(editDataError !== null ){
          setEditDataError(null)
        }
        
        logout()
          .then( () => setUser(null) )

      } )
      .catch((err)=>{
        console.log(err)
        //FIXME: network erreur 
      })
  }



  // -------------------------- main return ---------------------------
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setDataModal(true);
          setDataLoad(true);
        }}
      >
        <Text>Change general data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setNewPassModal(true);
        }}
      >
        <Text>Change password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setDeleteAccModal(true);
        }}
      >
        <Text>Delete account</Text>
      </TouchableOpacity>

      {/* modal logic */}

      <Modal visible={datamodal}>
        <TouchableOpacity onPress={() =>{ 
          setDataModal(false)
          // in case user returns from edit with an error on the state
          if(editDataError !== null ){
          setEditDataError(null);
          }  
          }}>
          <MaterialCommunityIcons name="close" size={20} />
        </TouchableOpacity>
        {renderEditDataUi()}
      </Modal>

      <Modal visible={newPassModal}>
        <TouchableOpacity onPress={() => {
          setNewPassModal(false)
          if(editDataError !== null ){
            setEditDataError(null);
          }           
          }
          }>
          <MaterialCommunityIcons name="close" size={20} />
        </TouchableOpacity>
          {renderNewPassUi()}
      </Modal>

      <Modal visible={deleteAccmodal}>
        <TouchableOpacity onPress={() => {
          setDeleteAccModal(false)
          setEditDataError(null)
        }}>
          <MaterialCommunityIcons name="close" size={20} />
        </TouchableOpacity>
        <AppForm
            initialValues={initValDel}
            schema={delAccSchema}
            handleSubmit={(data) => handleDeleteAccount(data)}
          >
            <AppFormField
              type="text"
              name="password"
              iconName="lock"
              label="enter your password to delete your account :"
              placeholder="enter your password confirmation "
              secureTextEntry={true}
            />
            {
              editDataError && (
                <>
                  <Text> {editDataError} </Text>
                </>
              )
            }
             <AppSubmitButton label="Delete Account" />
          </AppForm>

         

      </Modal>
    </>
  );
};

export default EditUserData;
