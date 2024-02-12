import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UniversityMap from '../screens/UniversityMap';
import EventListScreen from '../screens/EventListScreen'; 
import Home from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="UniversityMap" component={UniversityMap} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="LocationDetails" component={LocationDetails} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EventList" component={EventListScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
