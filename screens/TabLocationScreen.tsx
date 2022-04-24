import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import * as TaskManager from 'expo-task-manager';
import settings from '../util/settings';


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
      watch_location();
    }, 1000)
  }


  const watch_location = async () => {
    // console.log('watch_location running')
    let location = await Location.watchPositionAsync(
      {
        // accuracy:Location.Accuracy.High,
        accuracy:Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 20,
      }, (location_update) => {
        setLocation(location_update);   
        console.log('-----------------------------------------');
        // console.log('update location:', location_update.coords);
        console.log('update time:', location_update.timestamp);
      }
    )
  }


  const setStatus = (phrase: string) => {
    const status = phrase;    
    console.log("status:", phrase);
  };


  // TaskManager.defineTask('gpstask', ({ data: { locations }, error }) => {
  //   if (error) {
  //     // check `error.message` for more details.
  //     console.log('Error message:', error.message);
  //     return;
  //   }
  //   setLocation(locations[0]);   
  //   console.log('Received new location', locations);
  // });


   // GPS thing
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     // let { status } = await Location.requestBackgroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     // let location = await Location.getCurrentPositionAsync({});
  //     let location2 = await Location.startLocationUpdatesAsync('gpstask');
  //     console.log("got GPS.");



  //       let location = await Location.watchPositionAsync(
  //       {
  //         accuracy:Location.Accuracy.High,
  //         timeInterval: 10000,
  //         distanceInterval: 80,
  //       },
  //       (location_update) => {
  //         console.log('update location!', location_update.coords);
  //       }
  //     )


  //     // setLocation(location);      
  //   })();
  // }, []);




  // const LocationCallback = () => {
  //   console.log("got location callback.");
  // };
    



  // const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

  // // 1 define the task passing its name and a callback that will be called whenever the location changes
  // TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
  //   if (error) {
  //     console.error(error);
  //     return;
  //   }
  //   const [location] = locations;
  //   try {
  //     const url = `https://<your-api-endpoint>`;
  //     // await axios.post(url, { location }); // you should use post instead of get to persist data on the backend
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  // // 2 start the task
  // Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
  //   accuracy: Location.Accuracy.Highest,
  //   distanceInterval: 1, // minimum change (in meters) betweens updates
  //   deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
  //   // foregroundService is how you get the task to be updated as often as would be if the app was open
  //   foregroundService: {
  //     notificationTitle: 'Using your location',
  //     notificationBody: 'To turn off, go back to the app and switch something off.',
  //   },
  // });

  // // 3 when you're done, stop it
  // Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((value) => {
  //   if (value) {
  //     Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
  //   }
  // });



  let text = 'Waiting..';
  let text_lat = '';
  let text_long = '';
  let text_alt = '';
  let text_speed = '';
  let text_heading = '';
  let text_accuracy = '';
  let text_altitudeAccuracy = '';
  let text_time = '';
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

    settings.coords.latitude = location["coords"]["latitude"];
    settings.coords.longitude = location["coords"]["longitude"];
    settings.coords.altitude = location["coords"]["altitude"] * 3.28084;
    settings.coords.speed = location["coords"]["speed"] * 2.2369;
    settings.coords.heading = location["coords"]["heading"];
    settings.coords.accuracy = location["coords"]["accuracy"] * 3.28084;
    settings.coords.altitudeAccuracy = location["coords"]["altitudeAccuracy"] * 3.28084;
    settings.coords.timestamp = location["timestamp"];
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Location</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <Text style={styles.gps}>{text}</Text> */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <View style={styles.separator} /> */}
      <Text style={styles.gps}>latitude: {text_lat}</Text>
      <Text style={styles.gps}>longitude: {text_long}</Text>
      <Text style={styles.gps}>altitude: {text_alt} feet</Text>
      <Text style={styles.gps}>altitudeAccuracy: {text_alt} feet</Text>
      <Text style={styles.gps}>accuracy: {text_accuracy} feet</Text>
      <Text style={styles.gps}>speed: {text_speed} mph</Text>
      <Text style={styles.gps}>heading: {text_heading}</Text>
      <Text style={styles.gps}>time: {text_time} milliseconds</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.separator} />
      {/* <Button title="Update GPS" onPress={null} /> */}
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

