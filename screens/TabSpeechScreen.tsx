import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Speech from 'expo-speech';
import React, { useState, useEffect } from 'react';

export default function TabSpeechScreen() {
  const [errorMsg, setErrorMsg] = useState(null);
  

  const speak1 = () => {
    const thingToSay = 'Chris, 1.2 miles at 4 oclock high.  Mark 2.0 miles at 12 oclock level.';    
    Speech.speak(thingToSay, { pitch: 1.0, rate: 1.2 } );
    console.log("speak1: ", thingToSay);
  };


  const speak2 = () => {
    const thingToSay = 'L Z is 2.4 miles at 7 oclock.  24 minutes till sunset.';    
    Speech.speak(thingToSay, { pitch: 1.0, rate: 1.2 } );
    console.log("speak2: ", thingToSay);
  };


  const speak3 = () => {
    const thingToSay = 'Oh shit.  danger, danger, danger, death is very likely, turn or do something you stupid dip shit.';    
    Speech.speak(thingToSay, { pitch: 1.0, rate: 1.2 } );
    console.log("speak3: ", thingToSay);
  };


  const speakAnything = (phrase: string) => {
    const thingToSay = phrase;    
    Speech.speak(thingToSay, { pitch: 1.0, rate: 1.2 } );
    console.log("speakAnything");
  };


  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Test</Text> */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Speak area" onPress={speak1} />
      <View style={styles.separator} />
      <Button title="Speak lz" onPress={speak2} />
      <View style={styles.separator} />
      <Button title="Speak Danger" onPress={speak3} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  separator: {
    marginVertical: 5,
    height: 2,
    width: '100%',
  },
});
