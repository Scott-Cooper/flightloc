import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState } from 'react';
import state, { getSettings } from '../util/state';
// import TabSpeechScreen from './TabSpeechScreen';


export default function TabTestScreen() {

  console.log("Got TabTestScreen ")
  // settings.sliderPitch = 44;
  // settings.coords.altitude = 6;
  // console.log('settings test:', settings.coords.altitude);

  // used for switch
  const [isEnabled1, setIsEnabled1] = useState(false);
  let text_test = '';
  text_test = JSON.stringify(isEnabled1);



  console.log("render TabTestScreen")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Test</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.title}>Test Progress</Text>
      <Text style={styles.mono}>text_test: {text_test}</Text>
      <Text style={styles.mono}>other: {JSON.stringify(state.coords.latitude)}</Text>
      {/* <Text style={styles.mono}>xValue: {xValue}</Text> */}
      {/* <Text style={styles.mono}>test: {JSON.stringify(settings.sliderPitch)}</Text> */}
      {/* <Text style={styles.mono}>test: {JSON.stringify(app.isEnabled9)}</Text> */}
      {/* <Text style={styles.mono}>test settings: {JSON.stringify(12345)}</Text> */}
      
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
