import React from 'react';
import { View, Text, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native';
import AppNavigator from '../navigation/AppNavigator';

const TutorialScreen2 = () => {
    const navigation = useNavigation();

    const handleNavigateToProfile = () => {
        navigation.navigate('Profile');
      };

    return (
        <View>
            <Pressable
                            onPress={handleNavigateToProfile}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>skip</Text>
                        </Pressable>
        </View>
    )
}

export default TutorialScreen2;