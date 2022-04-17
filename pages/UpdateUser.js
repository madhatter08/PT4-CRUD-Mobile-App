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

const UpdateUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userStudentID, setUserStudentID] = useState('');
  let [userName, setUserName] = useState('');
  let [userCourse, setUserCourse] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let updateAllStates = (studentid, name, course, contact, address) => {
    setUserStudentID(studentid);
    setUserName(name);
    setUserCourse(course);
    setUserContact(contact);
    setUserAddress(address);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.user_studentid,
              res.user_name,
              res.user_course,
              res.user_contact,
              res.user_address,
            );
          } else {
            alert('No user found');
            updateAllStates('', '', '', '', '');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserId, userStudentID, userName, userCourse, userContact, userAddress);

    if (!inputUserId) {
      alert('Please fill User ID');
      return;
    }
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

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_course=?, user_address=?, user_studentid=?, user_contact=? where user_id=?',
        [userName, userCourse, userAddress, userStudentID, userContact, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
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
                placeholder="Enter User ID"
                style={{ padding: 10 }}
                onChangeText={
                  (inputUserId) => setInputUserId(inputUserId)
                }
              />
              <Mybutton
                title="Search User"
                customClick={searchUser} 
              />
              <Mytextinput
                placeholder="Enter Student ID"
                value={userStudentID}
                style={{ padding: 10 }}
                onChangeText={
                  (userStudentID) => setUserStudentID(userStudentID)
                }
              />
              <Mytextinput
                placeholder="Enter Name"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={
                  (userName) => setUserName(userName)
                }
              />
              <Mytextinput
                placeholder="Enter Course"
                value={userCourse}
                style={{ padding: 10 }}
                onChangeText={
                  (userCourse) => setUserCourse(userCourse)
                }
              />
              <Mytextinput
                placeholder="Enter Contact No"
                value={'' + userContact}
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userAddress}
                placeholder="Enter Address"
                onChangeText={
                  (userAddress) => setUserAddress(userAddress)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Update User"
                customClick={updateUser}
              />
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

export default UpdateUser;