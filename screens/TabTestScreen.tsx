import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState } from 'react';
import state, { getSettings } from '../util/state';


export default function TabTestScreen() {
  console.log("render TabTestScreen")

  // used for switch
  const [isEnabled1, setIsEnabled1] = useState(false);
  let text_test = '';
  text_test = JSON.stringify(isEnabled1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testing in Progress</Text>
      <Text style={styles.mono}>text_test: {text_test}</Text>
      <Text>{isEnabled1 ? 'On' : 'Off'}</Text>
      <View style={styles.separator} />
      <Text style={styles.mono}>apidata: {JSON.stringify(state.apidata)}</Text>
    </View>
  );

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
});

