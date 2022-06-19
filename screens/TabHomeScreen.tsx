import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import logo from '../assets/images/flightloc1.jpg'; 
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import storage, { getSettings } from '../util/storage';


export default function TabHomeScreen({ navigation }: RootTabScreenProps<'TabHome'>) {
  
  useEffect(() => {
    // Run once during load
    getSettings();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image source={logo} style={{ resizeMode: 'stretch', width: 450, height: ScreenHeight-useBottomTabBarHeight()-100 }}></Image> */}
      <Image source={logo} style={{ width: "100%", height: ScreenHeight-useBottomTabBarHeight()-80 }}></Image>

      {/* <Text style={styles.title}>FlightLoc Home</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        {/* <Text style={styles.text}> */}
        {/* Powered Paragliders fall into the category of Ultralights. In the United States, the regulations that apply to ultralights are in the Federal Aviation Regulations (FAR), Part 103. There are some other regulations concerning Notices to Airmen (NOTAM’s) in FAR part 91 which are also applicable to powered paragliders. Everything you need to know is listed below. */}
        {/* </Text> */}

        {/* <Text style={styles.text}></Text> */}

        {/* <Text style={styles.text}> */}
        {/* This section defines the term “ultralight vehicle,” The proposed rule would have limited the term to single-occupant designs weighing less than 155 pounds, with a fuel capacity of 15 pounds or less, and which had no U.S. or foreign airworthiness certificate. The final rule expands the definition to differentiate between powered and unpowered ultralight vehicles. The 155-pound weight limitation has been retained for unpowered designs and is the only criterion for those vehicles. Those ultralights equipped with powerplants must weigh less than 254 pounds empty weight. In addition, powered ultralight vehicles must have a fuel capacity not exceeding 5 U.S. gallons and be incapable of more than 55 knots calibrated airspeed at full power in level flight. The power off stall speed of a powered ultralight must not exceed 24 knots calibrated airspeed. */}
        {/* </Text> */}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
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
