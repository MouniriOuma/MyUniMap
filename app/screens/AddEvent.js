import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebaseAuth, firestoreDB } from '../../FirebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import placesData from '../data/places';
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';




const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [creator, setCreator] = useState('');

  const navigation = useNavigation();


  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceChange = (value) => {
    setLocation(value);
  };

  // Transform placesData to match the expected format of SelectList
  const formattedPlacesData = placesData.map((place) => ({
    label: place.name,
    value: place.name,
  }));





  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // Extract username from email
        const username = user.email.split('@')[0];
        setCreator(username);
      }
    });
    return unsubscribe;
  }, []);


  const addEvent = async () => {
    try {
      const docRef = await addDoc(collection(firestoreDB, 'events'), {
        title: title,
        description: description,
        location: location,
        date: date,
        creator: creator,
        likes: 0, // Initial likes count
      });
      console.log('Event added successfully with ID: ', docRef.id);
      // Clear form fields after adding event
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');

      console.log('Form fields cleared successfully');

      // Navigate to the EventList page
      console.log('Navigating to Events page...');
      navigation.goBack();
      console.log('Navigation completed.');

    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Text style={styles.label}>Location:</Text>
      <SelectList
      setSelected={(val) => handlePlaceChange(val)}
      data={formattedPlacesData}
      save="value"
      boxStyles={styles.input}
      dropdownStyles={styles.dropDown}
      />
      {selectedPlace && <Text>Selected Place: {selectedPlace}</Text>}
      
      <Text style={styles.label}>Date (DD/MM/YYYY HH:MM):</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={text => setDate(text)}
        placeholder="DD/MM/YYYY HH:MM"
      />
      <Button title="Add Event" onPress={addEvent} color="#007260" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff', 
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
      color: '#39B68D', 
    },
    input: {
      height: 40,
      borderColor: '#39B68D', 
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 10, 
      color: '#007260', 
    },
    dropDown: {
      width: "100%",
      borderColor: '#39B68D', 
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 10, 
      color: '#007260', 
    },
    button: {
      backgroundColor: '#39B68D', 
      borderRadius: 10, 
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff', 
      fontSize: 16,
    },
  });
export default AddEvent;
