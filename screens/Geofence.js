import React from 'react';
import MapView, { Circle } from 'react-native-maps';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

const Geofence = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', paddingBottom: 20 }}>Add safe area</Text>
            <MapView style={styles.map} 
                initialRegion={{
                    latitude: 53.2775,
                    longitude: -9.0107,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Circle center={{ latitude: 53.2775, longitude: -9.0107 }} radius={100}/>
            </MapView>
            <Text
                style={{ color: 'red', fontSize: 20, paddingTop: 20 }}
                onPress={() => navigation.navigate('Login')}
            >
                Log out
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
    },
    map: {
        width: 350,
        height: 500,
    },
  });

export default Geofence;