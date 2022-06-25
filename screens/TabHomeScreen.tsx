import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import logo from '../assets/images/flightloc1.jpg'; 
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import storage, { getSettings } from '../util/storage';
import { getVoices } from './TabSpeechScreen';
var pkg = require('../app.json');

export default function TabHomeScreen({ navigation }: RootTabScreenProps<'TabHome'>) {
  
  useEffect(() => {
    // Run once during load
    // clearAppData();
    getSettings();
    getVoices();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: "100%", height: ScreenHeight-useBottomTabBarHeight()-80 }}></Image>
      <Text style={styles.overlay}>Version {pkg.expo.version}</Text>
      {/* <Text style={styles.overlay}>{pkg.expo.name}{'\n'}Version {pkg.expo.version}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
  overlay: {
    position: 'absolute',
    top: ScreenHeight-150,
    right: 0,
    bottom: 0,
    left: 228,
    color: 'black',
    // backgroundColor: 'red',
    // opacity: 0.2,
    fontSize: 15,
    // fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
