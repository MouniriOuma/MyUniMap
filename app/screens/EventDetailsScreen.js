import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity  } from 'react-native';
import { firestoreDB,firebaseAuth } from '../../FirebaseConfig';
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore'; 

const EventDetails = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [eventDetails, setEventDetails] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDoc = await getEventDocument(eventId);
        if (eventDoc.exists()) {
          setEventDetails(eventDoc.data());
          console.log(eventDoc.data())
          console.log(eventDoc.data().creator)
          checkIfCreator(eventDoc.data().creator);
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

  //fetch user
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


  //check if cretor to show delete button
  const checkIfCreator = (creator) => {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      // Extract username from email
      const username = currentUser.email.split('@')[0];
      // Compare extracted username with creator
      if (username === creator) {
        setIsCreator(true);
      }
    }
  };
  
  if (!eventDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading event details...</Text>
      </View>
    );
  }

  const handleDeleteEvent = async () => {
    try {
      await deleteDoc(doc(firestoreDB, 'events', eventId));
      console.log('Event deleted successfully');
      navigation.navigate('Events');
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete the event. Please try again later.');
    }
  };


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
          <TouchableOpacity onPress={handleLocationPress} style={styles.viewOnMapButton}>
            <Text style={styles.viewOnMapButtonText}>View on Map</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Render delete button if the current user is the creator */}
      {isCreator && (
        <View>
            <View style={styles.buttonMargin} />
            <TouchableOpacity onPress={handleDeleteEvent} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Event</Text>
            </TouchableOpacity>
          </View>
          )}
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
    viewOnMapButton: {
      backgroundColor: '#007260',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignItems: 'center',
    },
    viewOnMapButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: '#C02E4A',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignItems: 'center',
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });
  

export default EventDetails;
