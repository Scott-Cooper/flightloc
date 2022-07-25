// https://flightloc.pythonanywhere.com/dump_it_all_or_else
// https://flightloc.pythonanywhere.com/clear_it_all_or_else
// https://flightloc.pythonanywhere.com/loc?key=135&user=Boot%20barn&lat=37.67125787023003&long=-97.41791096809567&alt=1250&heading=186&speed=19.86&accuracy=23.2&alt_accuracy=30&max_distance=25&max_lag=20000&min_speed=5
// https://flightloc.pythonanywhere.com/loc?key=205&user=Vortac&lat=37.745261&long=-97.583838&alt=1278&heading=85&speed=31.23&accuracy=37&alt_accuracy=29.6&max_distance=19&max_lag=20000&min_speed=5
// https://flightloc.pythonanywhere.com/loc?key=123&user=Field&lat=37.668453&long=-97.701083&alt=1223&heading=45&speed=25.49&accuracy=66&alt_accuracy=14.3&max_distance=20&max_lag=20000&min_speed=5
// https://flightloc.pythonanywhere.com/loc?key=117&user=Norwich&lat=37.457929&long=-97.835638&alt=1200&heading=0&speed=24.3&accuracy=16.2&alt_accuracy=13&max_distance=20&max_lag=20000&min_speed=5

import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import state from '../util/state';
import { speakAnything }  from './TabSpeechScreen';


export default function TabLocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [time, setTime] = useState(Date.now());
  

  // useEffect executes when the screen is loaded, only happens once
  // Gets rerun during refresh, so it will get doubled up in debug mode
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
      console.log('Keep awake activated')
      activateKeepAwake(); 
      console.log('Interval run')
      interval();
    })();
  }, []);


  const interval = async () => {
    const getLoc = setInterval(async () => {
      // console.log('interval running');
      console.log('-----------------------------------------');
      get_gps();
    }, 3000)
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
        // console.log('update location:', location_update.coords);
        console.log('get_gps   gps time:', location_update.timestamp);
      }
    )
    console.log('get_gps complete  ' + Date.now())
    fetch_api(); 
  }

  
const fetch_api = async () => {
  console.log('fetch_api running  ' + Date.now())
  // try {
    let url = 'https://flightloc.pythonanywhere.com/loc?'
    url += 'key=' + state.settings.keycode
    url += '&user=' + state.settings.user
    url += '&lat=' + state.coords.latitude
    url += '&long=' + state.coords.longitude
    url += '&alt=' + state.coords.altitude
    url += '&heading=' + state.coords.heading
    url += '&speed=' + state.coords.speed
    url += '&accuracy=' + state.coords.accuracy
    url += '&alt_accuracy=' + state.coords.altitudeAccuracy
    url += '&max_distance=50'
    url += '&max_lag=86400000'
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



  let text = 'Waiting..'
  let text_lat = ''
  let text_long = ''
  let text_alt = ''
  let text_speed = ''
  let text_heading = ''
  let text_accuracy = ''
  let text_altitudeAccuracy = ''
  let text_time = ''
  let text_apidata = ''
  let text_pretty_apidata = ''
  let text_spoken_apidata = ''

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
      text_pretty_apidata += p[key]['user'] + " " + p[key]['dis'].toFixed(1) + " miles\n    bearing " + p[key]['bearing'].toFixed(0) + "\n    course " + p[key]['heading'].toFixed(0) + "\n    at " + p[key]['speed'].toFixed(0) + " mph\n"
      
      if (state.settings.isIncludeBearing) {
        text_spoken_apidata += p[key]['user'] + " " + p[key]['dis'].toFixed(1) + " miles at " + p[key]['bearing'].toFixed(0) + ",\n"
      } else {
        text_spoken_apidata += p[key]['user'] + " " + p[key]['dis'].toFixed(1) + " miles,\n"
      }
    }
    speakAnything('location', text_spoken_apidata);
    console.log(text_pretty_apidata);
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
      <View style={styles.separator}/>
      <Text style={styles.gps}>{text_spoken_apidata}</Text>

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

