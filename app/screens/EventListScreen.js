import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const EventList = ({ navigation }) => {
    const events = [
        // Array of events with picture, title, date, and number of likes
        // Example:
        { id: 1, title: 'Event 1', date: '2024-02-20', likes: 10, image: require('../../assets/event.jpg') },
        { id: 2, title: 'Event 2', date: '2024-02-21', likes: 20, image: require('../../assets/event.jpg') },
        { id: 3, title: 'Event 1', date: '2024-02-20', likes: 10, image: require('../../assets/event.jpg') },
        { id: 4, title: 'Event 2', date: '2024-02-21', likes: 20, image: require('../../assets/event.jpg') },
    ];

    const renderEventItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
          <View style={styles.eventContainer}>
            <Image source={item.image} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
              <View style={styles.likeContainer}>
                <View style={styles.likesContainer}>
                  <Ionicons name="heart" size={20} color="#007260" />
                  <Text style={styles.likes}>{item.likes}</Text>
                </View>
                <TouchableOpacity style={styles.likeButton}>
                  <Text style={styles.likeButtonText}>Like</Text>
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
        />
        {/* Round button for adding an event */}
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddEvent')}
        >
            <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
        </View>

        // <View style={styles.container}>
        //   <ScrollView>
        //     <FlatList
        //       data={events}
        //       renderItem={renderEventItem}
        //       keyExtractor={item => item.id.toString()}
        //     />
        //   </ScrollView>
        //   {/* Round button for adding an event */}
        //   <TouchableOpacity
        //     style={styles.addButton}
        //     onPress={() => navigation.navigate('AddEvent')}
        //   >
        //     <Ionicons name="add" size={30} color="#fff" />
        //   </TouchableOpacity>
        // </View>
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
