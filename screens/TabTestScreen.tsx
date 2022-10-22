import { Text, View } from '../components/Themed'
import { StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import state from '../util/state'
import MapView, { Marker } from 'react-native-maps'


const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 29.9990674
const LONGITUDE = -90.0852767
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const SPACE = 0.01

const coord = {
  latitude: state.coords.latitude,
  longitude: state.coords.longitude,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}


export default function TabTestScreen() {
  console.log("render TabTestScreen")

  // used for switch
  const [isIncludeCollision, setIsIncludeCollision] = useState(false)
  let text_test = ''
  text_test = JSON.stringify(isIncludeCollision)

  return (
    <View style={styles.container}>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: state.coords.latitude,
          longitude: state.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >

        <Marker
          coordinate = {coord}
          title = {state.settings.user}
          description={'Altitude: ' + state.coords.altitude.toFixed(0).toString() } 
        />

      </MapView>

    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mono: {
    fontSize: 11,
    fontFamily: 'space-mono',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
