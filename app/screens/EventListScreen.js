import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs, doc, updateDoc, increment  } from 'firebase/firestore';
import { firestoreDB } from '../../FirebaseConfig';




const EventList = ({ navigation }) => {
    const [events, setEvents] = useState([]);
    
    //refreshing page
    const [refreshing, setRefreshing] = useState(false);
    

    // Function to generate a random color
    const generateRandomColor = () => {
        const colors = ['#006652', '#005B45', '#004F38', '#002A20','#2B9C78', '#238663', '#1B704D', '#0A372B'];
        return colors[Math.floor(Math.random() * colors.length)];
    };


    useEffect(() => {
        fetchEvents();
    }, []);


    const fetchEvents = async () => {
        try {
            const eventsCollection = collection(firestoreDB, 'events');
            const querySnapshot = await getDocs(eventsCollection);

            const eventData = [];
            querySnapshot.forEach((doc) => {
                const event = doc.data();
                eventData.push({
                    id: doc.id,
                    title: event.title,
                    date: event.date,
                    likes: event.likes,
                    creator: event.creator,
                    description: event.description,
                    location: event.location,
                });
            });

            setEvents(eventData);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchEvents().then(() => {
            setRefreshing(false);
        }).catch(error => {
            console.error('Error refreshing data:', error);
            setRefreshing(false);
        });
    };

    


        const renderEventItem = ({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
                <View style={styles.eventContainer}>
                    <View style={[styles.eventImage, { backgroundColor: generateRandomColor() }]} />
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <Text style={styles.eventDate}>{item.date}</Text>
                        
                        <View style={styles.likeContainer}>
                            <View style={styles.likesContainer}>
                                <Ionicons name="heart" size={20} color="#007260" />
                                <Text style={styles.likes}>{item.likes}</Text>
                            </View>
                        
                            <TouchableOpacity style={styles.likeButton} >
                                <Text style={styles.likeButtonText} >Like</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );

      return (
    <View style={styles.container}>
        <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={item => item.id.toString()}
            style={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#007260']} 
                />
            }
        />
        {/* Round button for adding an event */}
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddEvent')}
        >
            <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
    </View>
);

    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    eventContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
    },
    eventImage: {
        width: '100%',
        height: 200,
    },
    eventInfo: {
        padding: 16,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    likes: {
        marginLeft: 4,
    },
    likeButton: {
        backgroundColor: '#007260',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    likeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007260',
        padding: 15,
        borderRadius: 30,
      },
});

export default EventList;
