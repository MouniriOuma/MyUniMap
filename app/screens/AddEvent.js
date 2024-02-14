import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebaseAuth, firestoreDB } from '../../FirebaseConfig';
import { collection, addDoc } from "firebase/firestore"; // Add these imports

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [creator, setCreator] = useState('');

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
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={text => setLocation(text)}
      />
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
