import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Ionicons } from '@expo/vector-icons'; 
import placesData from '../data/places';

const UniversityMap = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  console.log("Route params:", route.params);

  const { userDestination } = route.params || {}; 

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    // Find the coordinates for the given location from placesData
    const locationData = placesData.find(item => item.name === userDestination);
    if (locationData) {
        setDestination({
            latitude: locationData.coordinates.latitude,
            longitude: locationData.coordinates.longitude,
        });
    }
  }, [userDestination]);

  useEffect(() => {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
          }
          
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);

          //set the origin state
          setOrigin({
              latitude: location.coords.latitude, 
              longitude: location.coords.longitude,
          });
      })();
  }, []);

  return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType='hybrid'
          initialRegion={{
            latitude: 33.22641775150057,
            longitude: -8.486079832931521,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {destination && location && (
            <MapViewDirections
              origin={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
              destination={destination}
              apikey="AIzaSyCRhpWDB0eIIC6izly6sHjr_2MSJtlyTHw"
              strokeWidth={4}
              strokeColor="red"
              mode={'WALKING'}
            />
          )}
          {destination && (
          <Marker
            coordinate={destination}
            title={userDestination}
          />
          )}
          {location && (
            <Marker
              coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
              title="Me"
            />
          )}
            
            {/* Render markers for each place */}
          {placesData.map((place, index) => (
            <Marker
              key={index}
              coordinate={place.coordinates}
              title={place.name}
            >
              
            </Marker>
          ))}


        </MapView>
      </View>
  );   
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default UniversityMap;
