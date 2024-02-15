import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
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

  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      console.log('User signed out');
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
});

export default Profile;

// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { firebaseAuth } from '../../FirebaseConfig';

// const Profile = () => {

//     useEffect(() => {
//         const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
//           if (user) {
//             // Extract username from email
//             const username = user.email.split('@')[0];
//             setCreator(username);
//           }
//         });
//         return unsubscribe;
//       }, []);

//     const handleLogout = () => {
//         firebaseAuth.signOut().then(() => {
//         console.log('User signed out');
//         }).catch((error) => {
//         console.error('Sign out error', error);
//         });
//     };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>This is the profile page</Text>
//       <Button onPress={handleLogout} title="Logout" />
//     </View>
//   );
// };

// export default Profile;
