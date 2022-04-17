import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from 'pages/components/Mybutton';
import Mytext from 'pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(50), user_contact INT(11), user_address VARCHAR(255), user_studentid VARCHAR(10), user_course VARCHAR(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="My CRUD SQLite Mobile App" />
          <Mybutton
            title="Register"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
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

export default HomeScreen;