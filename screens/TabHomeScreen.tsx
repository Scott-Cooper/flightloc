import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import logo from '../assets/images/flightloc1.jpg'; 
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import storage, { clearAppData, getSettings } from '../util/storage';


export default function TabHomeScreen({ navigation }: RootTabScreenProps<'TabHome'>) {
  
  useEffect(() => {
    // Run once during load
    // clearAppData();
    getSettings();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: "100%", height: ScreenHeight-useBottomTabBarHeight()-80 }}></Image>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
