import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { firestoreDB, firebaseAuth } from '../../FirebaseConfig';
import placesData from '../data/places';
import { yupResolver } from '@hookform/resolvers/yup';


const AddEvent = () => {
  const navigation = useNavigation();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [creator, setCreator] = useState('');

  
  const [errors, setErrors] = useState({});

  //yup validation
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    selectedPlace: yup.string().required('Location is required'),
    date: yup
      .string()
      .required('Date is required')
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4} (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
        'Invalid date format (DD/MM/YYYY HH:MM)'
      ),
  });

 
  //Extract creator
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

  //set location
  const handlePlaceChange = (value) => {
    setSelectedPlace(value);
  };
  
  // Transform placesData to match the expected format of SelectList
  const formattedPlacesData = placesData.map((place) => ({
    label: place.name,
    value: place.name,
  }));

  
  
  const addEvent = async () => {
    try {
      await schema.validate({title, description, selectedPlace, date}, { abortEarly: false })

      const docRef = await addDoc(collection(firestoreDB, 'events'), {
        title: title,
        description: description,
        location: selectedPlace,
        date: date,
        creator: creator,
        likes: 0,
      });
      console.log('Event added successfully with ID: ', docRef.id);
      // Clear form fields after adding event
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');

      console.log('Form fields cleared successfully');

      setErrors({});
      // Navigate to the EventList page
      navigation.goBack();
    } catch (error) {
      console.error('Error adding event:', error);
      if (error instanceof yup.ValidationError) {
        // Extracting yup specific validation errors from list of total errors
        const yupErrors = {};
        error.inner.forEach((innerError) => {
          yupErrors[innerError.path] = innerError.message;
        });
  
        // Saving extracted errors
        setErrors(yupErrors);
      }
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
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <Text style={styles.label}>Location:</Text>
      <SelectList
      setSelected={(val) => handlePlaceChange(val)}
      data={formattedPlacesData}
      save="value"
      boxStyles={styles.input}
      dropdownStyles={styles.dropDown}
      />
      {selectedPlace && <Text>Selected Place: {selectedPlace}</Text>}
      {errors.selectedPlace && <Text style={styles.error}>{errors.selectedPlace}</Text>}

      <Text style={styles.label}>Date (DD/MM/YYYY HH:MM):</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={text => setDate(text)}
        placeholder="DD/MM/YYYY HH:MM"
      />
      {errors.date && <Text style={styles.error}>{errors.date}</Text>}

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
    color: '#222222',
  },
  dropDown: {
    width: '100%',
    borderColor: '#39B68D',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#007260',
  },
  error: {
    color: 'red',
  },
});

export default AddEvent;
