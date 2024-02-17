import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Ionicons } from '@expo/vector-icons'; 
import placesData from '../data/places';
import { SelectList } from 'react-native-dropdown-select-list';

const UniversityMap = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //search bar
  const [selectedPlace, setSelectedPlace] = useState(null);

  //destination
  const { userDestination } = route.params || {}; 
  const [destination, setDestination] = useState(null);


  useEffect(() => {
    console.log('userDestination:', userDestination);
    // Find the coordinates for the given location from placesData
    const locationData = placesData.find(item => item.name === userDestination);
    console.log('locationData:', locationData);
    if (locationData) {
      console.log('Setting destination:', locationData.coordinates);
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

      const initLocation = await Location.getCurrentPositionAsync({});
      setLocation(initLocation);

      const intervalId = setInterval(() => {
        getLiveLocation();
      }, 4000);

      return () => clearInterval(intervalId);
    })();
  }, []);


  const getLiveLocation = async () => {
    const liveLocation = await Location.getCurrentPositionAsync({});
    setLocation(liveLocation);
  };
  

  //destination from the search bar
  useEffect(() => {
    if (selectedPlace) {
      const locationData = placesData.find((place) => place.name === selectedPlace);
      if (locationData) {
        setDestination({
          latitude: locationData.coordinates.latitude,
          longitude: locationData.coordinates.longitude,
        });
      }
    }
  }, [selectedPlace]);

  //search bar
  const formattedPlacesData = placesData.map((place) => ({
    label: place.name,
    value: place.name,
  }));

  const handlePlaceChange = (value) => {
    setSelectedPlace(value);
  };

  return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SelectList
            setSelected={(val) => handlePlaceChange(val)}
            data={formattedPlacesData}
            save="value"
            boxStyles={styles.input}
            dropdownStyles={styles.dropDown}
            />
        </View>
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
              origin={location.coords}
              destination={destination}
              apikey="YOUR_API_KEY"
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
              coordinate={location.coords}
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
  container: {flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: '#39B68D', 
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10, 
    color: '#007260', 
  },
  dropDown: {
    width: "100%",
    borderColor: '#39B68D', 
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10, 
    color: '#007260', 
  },
  selectedPlace: {
    fontSize: 16,
  },
  selectedPlace: {
    fontSize: 16,
  },
});

export default UniversityMap;
