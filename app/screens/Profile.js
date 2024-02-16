import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [creator, setCreator] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // Extract username from email
        const username = user.email.split('@')[0];
        const userEmail = user.email;
        setCreator(username);
        setCreatorEmail(userEmail);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      console.log('User signed out');
      navigation.navigate('Login');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle-outline" size={100} color="#007260" />
          </View>
          <Text style={styles.username}>{creator}</Text>
          <Text style={styles.userEmail}>{creatorEmail}</Text>
        </View>
        <View>
        <View style={styles.wifiCard}>
      <Text style={styles.title}>WIFI Access information</Text>
      <Text style={styles.text}>Network name: compus</Text>
      <Text style={styles.text}>Email: your academic email</Text>
      <Text style={styles.text}>Password: your ucd password</Text>
    </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  card: {
    
    marginTop: 60,
    borderColor: '#39B68D', 
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007260',
  },
  userEmail: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },
  logoutButton: {
    backgroundColor: '#39B68D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wifiCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Profile;