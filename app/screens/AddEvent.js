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

  const navigation = useNavigation();

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

      // Navigate to the EventList page
      navigation.navigate('Events');
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

<SelectList
      setSelected={(val) => handlePlaceChange(val)}
      data={formattedPlacesData}
      save="value"
    />
      {selectedPlace && <Text>Selected Place: {selectedPlace}</Text>}
      
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={text => setDate(text)}
        placeholder="YYYY-MM-DD HH:MM"
      />
      <Button title="Add Event" onPress={addEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddEvent;
