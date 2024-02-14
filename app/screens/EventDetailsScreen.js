import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetails = ({ route }) => {
    // Extract event details from the route params
    const { eventId } = route.params;

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.description}>{description}</Text> */}
            <View style={styles.likesContainer}>
                {/* <Text style={styles.likes}>{likes}</Text> */}
                <Text style={styles.likesText}>Likes</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 18,
        marginBottom: 16,
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likes: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 8,
    },
    likesText: {
        fontSize: 16,
    },
});

export default EventDetails;
