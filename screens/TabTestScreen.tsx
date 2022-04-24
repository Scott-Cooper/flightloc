import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import settings from '../util/settings';


export default function TabTestScreen() {


  for (let i = 0; i < 3; i++) {
    // text += cars[i] + "<br>";
    console.log("Got TabTestScreen ", i)
  }
  // settings.sliderPitch = 44;
  // settings.coords.altitude = 6;
  console.log('settings test:', settings.coords.altitude);

  // used for switch
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  let text_test = '';
  text_test = JSON.stringify(isEnabled1);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Test</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />



      <Text style={styles.title}>Test is enabled</Text>
      <Text style={styles.mono}>latitude: {text_test}</Text>
      <Text style={styles.mono}>other: {JSON.stringify(isEnabled1)}</Text>

      <Text style={styles.mono}>test: {JSON.stringify(settings.sliderPitch)}</Text>
      
      <Text>{isEnabled1 ? 'On' : 'Off'}</Text>
    {/* if(isEnabled1) {
      <Text style={styles.title}>Test is enabled</Text>
    } else {
      <Text style={styles.title}>Test is not enabled</Text>
    } */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
