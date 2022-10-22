import { Text, View } from '../components/Themed'
import { StyleSheet, Image } from 'react-native'
import { RootTabScreenProps } from '../types'
import logo from '../assets/images/flightloc.webp'
import React, { useEffect } from 'react'
import { getSettings } from '../util/storage'
import { getVoices } from './TabSpeechScreen'
var pkg = require('../app.json')


export default function TabHomeScreen({ navigation }: RootTabScreenProps<'TabHome'>) {
  
  useEffect(() => {
    // Run once during load
    // clearAppData()
    getSettings()
    getVoices()
  }, [])


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.splash}></Image>
      <Text style={styles.name}>{pkg.expo.name}</Text>
      <Text style={styles.version}>Version {pkg.expo.version}</Text>
    </View>
  )
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
  splash: {
    // position: 'absolute',
    // position: 'relative',
    // padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // top: 0,
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: -60,
    // left: -50,
    // resizeMode: 'contain',
    // resizeMode: 'repeat',
    // resizeMode: 'stretch',
    // right: "-105%",
    // bottom: "30%",
    // width: "100%",
    width: "120%",
    height: "100%",
    // width: 700,
    // height: 700,
    // marginBottom: 10,

  },
  name: {
    position: 'absolute',
    padding: 10,
    textAlign: 'right',
    bottom: "6%",
    right: "6%",
    color: 'black',
    fontSize: 45,
    fontWeight: 'bold',
  },
  version: {
    position: 'absolute',
    padding: 10,
    textAlign: 'right',
    bottom: "4%",
    right: "6%",
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
})
