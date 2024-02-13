import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UniversityMap from '../screens/UniversityMap';
import EventListScreen from '../screens/EventListScreen'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TabHome" component={Home} />
      <Tab.Screen name="UniversityMap" component={UniversityMap} />
      {/* Add more tab screens as needed */}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="UniversityMap" component={UniversityMap} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={AppTabs} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="LocationDetails" component={LocationDetails} />
      <Stack.Screen name="EventList" component={EventListScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
