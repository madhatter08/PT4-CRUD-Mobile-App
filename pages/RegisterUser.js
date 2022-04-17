import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from 'pages/components/Mytextinput';
import Mybutton from 'pages/components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase' });

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userStudentID, setUserStudentID] = useState('');
  let [userCourse, setUserCourse] = useState('');

  let register_user = () => {
    console.log(userStudentID, userName, userCourse, userContact, userAddress);

    if (!userStudentID) {
      alert('Please fill Student ID');
      return;
    }
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userCourse) {
      alert('Please fill Course');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address, user_studentid, user_course) VALUES (?,?,?,?,?)',
        [userName, userContact, userAddress, userStudentID, userCourse],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Student ID"
                onChangeText={
                  (userStudentID) => setUserStudentID(userStudentID)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Course"
                onChangeText={
                  (userCourse) => setUserCourse(userCourse)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={11}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={
                  (userAddress) => setUserAddress(userAddress)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
          </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: '#000',
          }}>
          Leah Manalo | BSIT 2-1
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#000'
          }}>
          IT Professional Elective 1
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;