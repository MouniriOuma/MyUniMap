import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screans/Login';
import List from './app/screans/List';
import Details from './app/screans/Details';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="List" component={Details} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
              
  useEffect(() => {
  onAuthStateChanged(FIREBASE_AUTH, (user) => {
     console. log('user', user);
    setUser(user);
  });
}, []);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
            <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        ):(
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )

        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
