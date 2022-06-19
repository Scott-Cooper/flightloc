import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
// import * as TaskManager from 'expo-task-manager';
import state, { getSettings } from '../util/state';


export default function TabLocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [time, setTime] = useState(Date.now());
  


  //useEffect executes when the screen is loaded, only happens once
  useEffect(() => {
    (async () => {
      let { status } = await  Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permission to access location was denied');
        return;
      } else {
        console.log('Access to foreground location granted')
        setStatus(status)
      }
      // watch_location();
      interval();
    })();
  }, []);


  const interval = async () => {
    const getLoc = setInterval(async () => {
      // console.log('interval running');
      console.log('-----------------------------------------');
      get_gps();
    }, 10000)
  }

  const get_gps = async () => {
    console.log('get_gps running  ', Date.now())
    let location = await Location.watchPositionAsync(
      {
        // accuracy:Location.Accuracy.High,
        accuracy:Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 20,
      }, (location_update) => {
        setLocation(location_update);  
        state.coords.latitude = location_update["coords"]["latitude"];
        state.coords.longitude = location_update["coords"]["longitude"];
        state.coords.altitude = location_update["coords"]["altitude"] * 3.28084;
        state.coords.speed = location_update["coords"]["speed"] * 2.2369;
        state.coords.heading = location_update["coords"]["heading"];
        state.coords.accuracy = location_update["coords"]["accuracy"] * 3.28084;
        state.coords.altitudeAccuracy = location_update["coords"]["altitudeAccuracy"] * 3.28084;
        state.coords.timestamp = location_update["timestamp"];
            // fetch_api(); 
        // console.log('update location:', location_update.coords);
        console.log('get_gps   gps time:', location_update.timestamp);
      }
    )
    console.log('get_gps complete  ' + Date.now())
    fetch_api(); 
  }


// https://flightloc.pythonanywhere.com/loc?key=135&user=Ben%20boot%20barn&lat=37.67125787023003&long=-97.41791096809567&alt=453&heading=786&speed=719.86&accuracy=760&alt_accuracy=306&max_distance=25&max_lag=20000&min_speed=5
// https://flightloc.pythonanywhere.com/loc?key=205&user=Chris%20vortac&lat=37.745261&long=-97.583838&alt=278&heading=982&speed=456.23&accuracy=937&alt_accuracy=379&max_distance=15&max_lag=20000&min_speed=5
// https://flightloc.pythonanywhere.com/loc?key=123&user=Scott%20field&lat=37.668453&long=-97.701083&alt=23&heading=845&speed=125.49&accuracy=166&alt_accuracy=143&max_distance=20&max_lag=20000&min_speed=5

const fetch_api = async () => {
  console.log('fetch_api running  ' + Date.now())
  // try {
    let url = 'https://flightloc.pythonanywhere.com/loc?'
    url += 'key=' + '327'
    url += '&user=' + 'Mobile Phone'
    url += '&lat=' + state.coords.latitude
    url += '&long=' + state.coords.longitude
    url += '&alt=' + state.coords.altitude
    url += '&heading=' + state.coords.heading
    url += '&speed=' + state.coords.speed
    url += '&accuracy=' + state.coords.accuracy
    url += '&alt_accuracy=' + state.coords.altitudeAccuracy
    url += '&max_distance=50'
    url += '&max_lag=864000'
    url += '&min_speed=1'

    // console.log('fetch_api url', url)
    const response = await fetch(url)
    console.log('fetch_api status', response.status)
    // console.log('fetch_api headers', response.headers)
    // console.log('fetch_api ok', response.ok)

    const apidata = await response.json()
    state.apidata = apidata
    // console.log('fetch_api:', apidata)
    // this.setState({loading: false, posts})
  // } catch (e) {
  //   console.log('fetch_api error:', e)
    // this.setState({loading: false, error: true})
  // }
  console.log('fetch_api complete  ' + Date.now())
}


const setStatus = (phrase: string) => {
    const status = phrase;    
    console.log("status:", phrase);
  };





  let text = 'Waiting..';
  let text_lat = '';
  let text_long = '';
  let text_alt = '';
  let text_speed = '';
  let text_heading = '';
  let text_accuracy = '';
  let text_altitudeAccuracy = '';
  let text_time = '';
  let text_apidata = '';
  let text_pretty_apidata = '';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // console.log('Received new location xxx', location);
    text = JSON.stringify(location);
    text_lat = JSON.stringify(location["coords"]["latitude"]);
    text_long = JSON.stringify(location["coords"]["longitude"]);
    text_alt = JSON.stringify(location["coords"]["altitude"] * 3.28084);
    text_speed = JSON.stringify(location["coords"]["speed"] * 2.2369);
    text_heading = JSON.stringify(location["coords"]["heading"]);
    text_accuracy = JSON.stringify(location["coords"]["accuracy"] * 3.28084);
    text_altitudeAccuracy = JSON.stringify(location["coords"]["altitudeAccuracy"] * 3.28084);
    text_time = JSON.stringify(location["timestamp"]);
    text_apidata = JSON.stringify(state.apidata);

    const p = state.apidata
    for (let key in p) {
      text_pretty_apidata += p[key]['user'] + " " + p[key]['dis'].toFixed(1) + " miles at " + p[key]['bearing'].toFixed(0) + ", "
    }
    console.log(text_pretty_apidata);

    // state.coords.latitude = location["coords"]["latitude"];
    // state.coords.longitude = location["coords"]["longitude"];
    // state.coords.altitude = location["coords"]["altitude"] * 3.28084;
    // state.coords.speed = location["coords"]["speed"] * 2.2369;
    // state.coords.heading = location["coords"]["heading"];
    // state.coords.accuracy = location["coords"]["accuracy"] * 3.28084;
    // state.coords.altitudeAccuracy = location["coords"]["altitudeAccuracy"] * 3.28084;
    // state.coords.timestamp = location["timestamp"];
    // console.log(state.coords)
    // console.log(state)
  }

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.gps}>latitude: {text_lat}</Text>
      <Text style={styles.gps}>longitude: {text_long}</Text>
      <Text style={styles.gps}>altitude: {parseFloat(text_alt).toFixed(1)} feet</Text>
      <Text style={styles.gps}>altitudeAccuracy: {parseFloat(text_altitudeAccuracy).toFixed(1)} feet</Text>
      <Text style={styles.gps}>accuracy: {parseFloat(text_accuracy).toFixed(1)} feet</Text>
      <Text style={styles.gps}>speed: {parseFloat(text_speed).toFixed(2)} mph</Text>
      <Text style={styles.gps}>heading: {parseFloat(text_heading).toFixed(0)}</Text>
      <Text style={styles.gps}>time: {text_time} milliseconds</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.separator} />

      {/* <View style={styles.separator} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.gps}>{text}</Text> */}

      <Text style={styles.gps}>{text_pretty_apidata}</Text>

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.gps}>api_data: {text_apidata}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // alignItems: 'center',
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gps: {
    fontSize: 11,
    fontFamily: 'space-mono',
  },
  separator: {
    marginVertical: 5,
    height: 2,
    width: '100%',
  },
});

