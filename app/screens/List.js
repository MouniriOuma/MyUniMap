/* import { View, Text, Button } from 'react-native'
 import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { firebaseAuth } from '../../FirebaseConfig';
         
 
 interface RouterProps {
    navigation: NavigationProp<any, any>;
  }
  const List = ({ navigation }: RouterProps) => {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => navigation.navigate('details')} title="Open Details" />
        <Button onPress={() => firebaseAuth.signOut()} title="Logout" />
      </View>
    );
};

   
export default List;
 */