import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UniversityMap from '../screens/UniversityMap';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventDetails from '../screens/EventDetailsScreen';
import EventList from '../screens/EventListScreen';
import AddEvent from '../screens/AddEvent';
import Profile from '../screens/Profile';
import TutorialScreen1 from '../screens/TutorialScreen1';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component={EventList} />
      <Tab.Screen name="UniversityMap" component={UniversityMap} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen name="UniversityMap" component={UniversityMap}  />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
