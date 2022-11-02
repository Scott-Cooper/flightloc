// https://flightloc.pythonanywhere.com/dump_it_all_or_else
// https://flightloc.pythonanywhere.com/clear_it_all_or_else
// https://flightloc.pythonanywhere.com/loc?key=fake135&user=Boot%20Barn&lat=37.671257&long=-97.417910&alt=1270&heading=125&speed=24.86&accuracy=17.2&alt_accuracy=35&max_distance=60&max_lag=20000&min_speed=-1
// https://flightloc.pythonanywhere.com/loc?key=fake205&user=Vortac&lat=37.745261&long=-97.583838&alt=1278&heading=182&speed=8.23&accuracy=19&alt_accuracy=79&max_distance=60&max_lag=20000&min_speed=-1
// https://flightloc.pythonanywhere.com/loc?key=fake923&user=Field&lat=37.668453&long=-97.701083&alt=1302&heading=45&speed=27.49&accuracy=36&alt_accuracy=143&max_distance=60&max_lag=20000&min_speed=-1
// https://flightloc.pythonanywhere.com/loc?key=fake117&user=Norwich&lat=37.457929&long=-97.835638&alt=1200&heading=0&speed=24.3&accuracy=16.2&alt_accuracy=13&max_distance=20&max_lag=20000&min_speed=5


import { Text, View } from '../components/Themed'
import { StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import state from '../util/state'
import { convert_angle_to_spoken_digits, convert_bearing_to_spoken_clock } from '../util/misc'
import { speakAnything }  from './TabSpeechScreen'
import { getVolume, VolumeManager } from 'react-native-volume-manager'


export default function TabLocationScreen() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  

  // useEffect executes when the screen is loaded, only happens once
  // Gets re-run during refresh, so it will get doubled up in debug mode
  useEffect(() => {
    (async () => {
      let { status } = await  Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('permission to access location was denied')
        return
      } else {
        console.log('access to foreground location granted')
      }

      console.log('activated keep awake')
      activateKeepAwake() 

      console.log('added volume listener')
      const volumeListener = VolumeManager.addVolumeListener((result) => {
        check_vol_buttons(result.volume)
        // returns the current volume as a float (0-1)
        // on android, the result object will also have the keys
        // music, system, ring, alarm, notification
      })

      console.log('setInterval started')
      const getLoc = setInterval(async () => {
        get_gps()
      }, 3000)

    })()

  }, [])


  const check_vol_buttons = (vol: number) => {
  // const check_vol_buttons = async (vol: number) => {
    var newvol = vol.toFixed(1).toString()
    console.log("check_vol_button " + vol + '-------------------------------------------------------------------------')
    // speakAnything('location volume test', "Vol button was pressed." + newvol)
    speakAnything('location', state.next_thing_to_say)
    // state.still_speaking = true
    // await VolumeManager.setVolume(0.7)
  }


  const get_gps = async () => {
    console.log('-----------------------------------------')
    console.log('get_gps running  ', Date.now())
    let location = await Location.watchPositionAsync(
      {
        // accuracy:Location.Accuracy.High,
        accuracy:Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 20,
      }, (location_update) => {
        setLocation(location_update)    
        state.coords.latitude = location_update["coords"]["latitude"]
        state.coords.longitude = location_update["coords"]["longitude"]
        state.coords.altitude = location_update["coords"]["altitude"] * 3.28084
        state.coords.speed = location_update["coords"]["speed"] * 2.2369
        state.coords.heading = location_update["coords"]["heading"]
        state.coords.accuracy = location_update["coords"]["accuracy"] * 3.28084
        state.coords.altitudeAccuracy = location_update["coords"]["altitudeAccuracy"] * 3.28084
        state.coords.timestamp = location_update["timestamp"]
        // console.log('update location:', location_update.coords)
        console.log('get_gps time      ', location_update.timestamp)
        fetch_api()
      }
    )
    console.log('get_gps complete  ' + Date.now())
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
      url += '&max_distance=' + state.settings.maxDistance
      url += '&max_lag=' + state.settings.maxLag * 1000
      url += '&min_speed=' + state.settings.minSpeed

      // console.log('fetch_api url', url)
      const response = await fetch(url)
      console.log('fetch_api status  ', response.status)
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
    console.log('fetch_api complete ' + Date.now())
  }



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
    text = errorMsg
  } else if (location) {
    // console.log('Received new location xxx', location)
    text = JSON.stringify(location)
    text_lat = JSON.stringify(location["coords"]["latitude"])
    text_long = JSON.stringify(location["coords"]["longitude"])
    text_alt = JSON.stringify(location["coords"]["altitude"] * 3.28084)
    text_speed = JSON.stringify(location["coords"]["speed"] * 2.2369)
    text_heading = JSON.stringify(location["coords"]["heading"])
    text_accuracy = JSON.stringify(location["coords"]["accuracy"] * 3.28084)
    text_altitudeAccuracy = JSON.stringify(location["coords"]["altitudeAccuracy"] * 3.28084)
    text_time = JSON.stringify(location["timestamp"])
    text_apidata = JSON.stringify(state.apidata)

    const p = state.apidata
    for (let key in p) {
      text_pretty_apidata += p[key]['user'] + " " + p[key]['dis'].toFixed(1) + " miles\n    bearing " + p[key]['bearing'].toFixed(0) + "\n    course " + p[key]['heading'].toFixed(0) + "\n    at " + p[key]['speed'].toFixed(0) + " mph\n"

      text_spoken_apidata += p[key]['user'] + ' ' + p[key]['dis'].toFixed(1) + ' miles'
      if (state.settings.isIncludeBearing) {
        if (state.settings.isRelativeClock) {
          text_spoken_apidata += ", at your " + convert_bearing_to_spoken_clock(p[key]['bearing'])
        } else {
          text_spoken_apidata += ", bearing " + convert_angle_to_spoken_digits(p[key]['bearing'])
        }
      }
      if (state.settings.isIncludeCourse) {
        text_spoken_apidata += ", course " + convert_angle_to_spoken_digits(p[key]['heading'])
      }
      if (state.settings.isIncludeAltitude) {
        var ralt = p[key]['alt'] - (location["coords"]["altitude"] * 3.28084) 
        var salt = ', level'
        if (ralt < -200) { salt = ', low' }
        if (ralt > 200) { salt = ', high' }
        text_spoken_apidata += salt
      }
      text_spoken_apidata += ".\n"
    }

    if(text_spoken_apidata == '') { text_spoken_apidata = 'No contacts' }

    // speakAnything('location', text_spoken_apidata)
    state.next_thing_to_say = text_spoken_apidata
    console.log(text_pretty_apidata)
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
      <Text style={styles.gps}>course: {parseFloat(text_heading).toFixed(0)}</Text>
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
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
})

