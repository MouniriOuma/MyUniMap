import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { firestoreDB } from '../../FirebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore'; 

const EventDetails = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDoc = await getEventDocument(eventId);
        if (eventDoc.exists()) {
          setEventDetails(eventDoc.data());
        } else {
          console.log('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const getEventDocument = async (eventId) => {
    const eventRef = doc(firestoreDB, 'events', eventId);
    const eventDoc = await getDoc(eventRef);
    return eventDoc;
  };

  if (!eventDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading event details...</Text>
      </View>
    );
  }


  const handleLocationPress = () => {
    // Navigate to UniversityMap and pass the location name as a parameter
    navigation.navigate('UniversityMap', { userDestination: eventDetails.location });
  };

  // Once the event details are fetched, display them
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{eventDetails.title}</Text>
      <View style={styles.card}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{eventDetails.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Likes:</Text>
          <Text style={styles.detailValue}>{eventDetails.likes}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Creator:</Text>
          <Text style={styles.detailValue}>{eventDetails.creator}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Description:</Text>
          <Text style={styles.detailValue}>{eventDetails.description}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{eventDetails.location}</Text>
          <View style={styles.buttonMargin} />
          <Button title="View on Map" color="#007260" onPress={handleLocationPress} />
        </View>
      </View>
    </View>
  );
  
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    detailItem: {
      marginBottom: 10,
    },
    detailLabel: {
      fontWeight: 'bold',
      color: '#007260',
    },
    detailValue: {
      color: '#333',
    },
    buttonMargin: {
        marginVertical: 10,
    },
  });
  

export default EventDetails;
