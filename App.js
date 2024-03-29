import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from './FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './app/navigation/AppNavigator';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';
import TutorialScreen1 from './app/screens/TutorialScreen1';
import TutorialScreen2 from './app/screens/TutorialScreen2';
import TutorialScreen3 from './app/screens/TutorialScreen3';
import TutorialScreen4 from './app/screens/TutorialScreen4';

//Please replace YOUR_API_KEY with you api key 
//in 'MyUniMap\app\screens\UniversityMap.js' line 110 
//in 'MyUniMap\app.json' line 27

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
              
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      console.log('user', user);
      setUser(user);
      if (user) {
        // Check if user is new (first time login)
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          setIsNewUser(true);
        } else {
          setIsNewUser(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    // If the user is not new and there's no user data in storage, set isNewUser to false
    if (!isNewUser) {
      AsyncStorage.getItem('user_data').then((userData) => {
        if (!userData) {
          setIsNewUser(false);
        }
      });
    }
  }, [isNewUser]);


  return (
    <SafeAreaView style={{ flex: 1}}>
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="Events" component={AppNavigator} options={{ headerShown: false }} />                   
              <Stack.Screen name="TutorialScreen1" component={TutorialScreen1} options={{ headerShown: false }}  />                   
              <Stack.Screen name="TutorialScreen2" component={TutorialScreen2} options={{ headerShown: false }}  />                   
              <Stack.Screen name="TutorialScreen3" component={TutorialScreen3} options={{ headerShown: false }}  />                   
              <Stack.Screen name="TutorialScreen4" component={TutorialScreen4} options={{ headerShown: false }}  />                   
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight || 0,
  },
});
