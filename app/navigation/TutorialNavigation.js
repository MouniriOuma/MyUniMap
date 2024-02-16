import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialScreen1 from '../screens/TutorialScreen1';
import TutorialScreen2 from '../screens/TutorialScreen2';
//import TutorialScreen3 from '../screens/TutorialScreen3';

const Stack = createNativeStackNavigator();

const TutorialNavigation = () => {
  return (
    <Stack.Navigator >
      {/*<Stack.Screen name="TutorialScreen1" component={TutorialScreen1} options={{ headerShown: false }} />
      <Stack.Screen name="TutorialScreen2" component={TutorialScreen2} options={{ headerShown: false }} />
       <Stack.Screen name="TutorialScreen3" component={TutorialScreen3} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};

export default TutorialNavigation;
