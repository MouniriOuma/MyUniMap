import React from 'react';
import { View, Text, Button } from 'react-native';
import { firebaseAuth } from '../../FirebaseConfig';


const Home = ({ navigation }) => {
  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the home page</Text>
      <Button onPress={handleLogout} title="Logout" />
      <Button onPress={() => navigation.navigate("AddEvent")} title="event" />
      <Button onPress={() => navigation.navigate("TutorialScreen1")} title="TutorialScreen1" />
      
    </View>
  );
};

export default Home;
