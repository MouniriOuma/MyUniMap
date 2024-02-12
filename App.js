import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from './FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './app/navigation/AppNavigator';
import TutorialNavigation from './app/navigation/TutorialNavigation';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';

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
    {/* <Stack.Navigator initialRouteName={"TutorialNavigation"}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TutorialNavigation" component={TutorialNavigation} options={{ headerShown: false }} />
    </Stack.Navigator> */}
    {/* <Stack.Navigator initialRouteName={user ? (isNewUser ? 'TutorialNavigation' : 'AppNavigator') : 'Login'}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TutorialNavigation" component={TutorialNavigation} options={{ headerShown: false }} />
    </Stack.Navigator> */}
    <Stack.Navigator>
        {user ? (
          isNewUser ? (
            <Stack.Screen name="TutorialNavigation" component={TutorialNavigation} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
          )
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
        
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
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
