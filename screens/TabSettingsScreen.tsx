import { Text, View } from '../components/Themed';
import { StyleSheet, ScrollView, Switch, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native';
import settings, { ddText } from '../util/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TabSettingsScreen() {

  // used for switch
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);

  // used for sliders
  const [sliderValue, setSliderValue] = useState(15);
  const [sliderVolume, setSliderVolume] = useState(7);
  const [sliderRate, setSliderRate] = useState(1.0);
  const [sliderPitch, setSliderPitch] = useState(1.0);


  useEffect(() => {
    // Run one during load
    retreive_all_settings();
  }, []);


  const save_all_settings = async() => {
    // console.log('save_all_settings, started')
    save_setting(sliderValue, "sliderValue")
    save_setting(sliderVolume, "sliderVolume")
    save_setting(sliderRate, "sliderRate")
    save_setting(sliderPitch, "sliderPitch")
  }
  

  const retreive_all_settings = async() => {
    // console.log('retreive_all_settings, started')
    retreive_setting(setSliderValue, "sliderValue")
    retreive_setting(setSliderVolume, "sliderVolume")
    retreive_setting(setSliderRate, "sliderRate")
    retreive_setting(setSliderPitch, "sliderPitch")
  }


  const save_setting = async(varName: any, keyName: string) => {
    try {
      const jsonValue = JSON.stringify(varName)
      console.log("save_setting,", keyName, typeof varName, varName, jsonValue)
      // console.log("save_setting,", keyName, JSON.stringify(jsonValue, null, 2))
      AsyncStorage.setItem(keyName, jsonValue)
    } catch (e) {
      console.log('save_setting, failed: ', e)
    }
  }

  
  const retreive_setting = async (setFunc: any, keyName: string) => {
    try {
      let jsonValue = await AsyncStorage.getItem(keyName)
      jsonValue != null ? JSON.parse(jsonValue) : null;
      if(jsonValue !== null) {
        setFunc(jsonValue)
      }
      console.log("retreive_setting,", keyName, JSON.stringify(jsonValue, null, 2) );
    } catch(e) {
      console.log('retreive_setting, failed: ', e)
    }
  }


  console.log("render TabTestScreen")
  settings.sliderPitch = sliderPitch

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Settings</Text> */}
      <View style={styles.separator} lightColor="#333" darkColor="#444" />
    
      <ScrollView style={styles.scrollView}>

        <View style={styles.section}>
        <Text style={styles.paragraph}>Call sign </Text>

          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // onChangeText={value => this.setState({ comment: value })}
            // value={number}
            placeholder="Pilot Name               "
            placeholderTextColor='#666'
            // selectionColor='#f00'
            // underlineColorAndroid='#f00'
            keyboardType="default"
          />
        </View>

        <View style={styles.section}>
          <Switch
            trackColor={{ false: '#777', true: '#8cf' }}
            thumbColor={isEnabled1 ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
          <Text style={styles.paragraph}>Collision warning</Text>
          <Text>{isEnabled1 ? ', On' : ', Off'}</Text>
        </View>

        <View style={styles.section}>
          <Switch
            trackColor={{ false: '#777', true: '#8cf' }}
            thumbColor={isEnabled2 ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
          <Text style={styles.paragraph}>Hammer time</Text>
          <Text>{isEnabled2 ? ', On' : ', Off'}</Text>
        </View>

        <View style={styles.section}>
          <Switch
            trackColor={{ false: '#777', true: '#8cf' }}
            thumbColor={isEnabled3 ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isEnabled3}
          />
          <Text style={styles.paragraph}>In the mean time you can get something cool to drink.  If you prefer to dine alone, just call ahead and let us know.</Text>
          <Text>{isEnabled3 ? ', On' : ', Off'}</Text>
        </View>


        <View style={styles.separator} lightColor="#333" darkColor="#444" />

        <Text style={styles.text}>
        The USHGA’s self-regulation program lacks the legal authority to enforce requirements
        to ensure the safety of others. There is no requirement for any hang glider operator
        to be a member of the USHGA.
        </Text>    

        <View style={styles.separator} lightColor="#333" darkColor="#444" />

        <Text style={styles.slider_label}>Number of GPS updates per minute.  Higher values will decrease lag, but increase battery drain. </Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={6}
            maximumValue={120}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={60}
            step={1}
            onValueChange={ (sliderValue) => setSliderValue(sliderValue) }
          />
          <Text style={styles.slider_values}>{sliderValue}</Text>
        </View>

        <Text style={styles.slider_label}>Seconds between location status</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={120}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={5}
            step={1}
            onValueChange={ (sliderValue) => setSliderValue(sliderValue) }
          />
          <Text style={styles.slider_values}>{sliderValue}</Text>
        </View>

        <Text style={styles.slider_label}>Voice volume  (default 1.0)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={sliderVolume}
            step={0.1}
            onValueChange={ (sliderVolume) => setSliderVolume(sliderVolume) }
          />
          <Text style={styles.slider_values}>{sliderVolume}</Text>
        </View>

        <Text style={styles.slider_label}>Voice rate  (default 1.0)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={3.0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={sliderRate}
            step={0.01}
            onValueChange={ (sliderRate) => setSliderRate(sliderRate) }
          />
          <Text style={styles.slider_values}>{sliderRate}</Text>
        </View>

        <Text style={styles.slider_label}>Voice pitch  (default 1.0)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={3.0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={sliderPitch}
            step={0.01}
            onValueChange={ (sliderPitch) => setSliderPitch(sliderPitch) }
          />
          <Text style={styles.slider_values}>{sliderPitch}</Text>
        </View>

        <View style={styles.separator} lightColor="#333" darkColor="#444" />
        <Button title="Save" onPress={save_all_settings} />
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // marginHorizontal: 16,
    // marginVertical: 32,
    // alignItems: 'center',
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
  view: {
    margin: 10,
  },
  scrollView: {
    // backgroundColor: "#fee",
    // marginHorizontal: 5,
  },
  text: {
    fontSize: 14,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(255,155,155,1)',
  },
  paragraph: {
    fontSize: 14,
  },
  input: {
    fontSize: 14,
    color: 'rgba(255,255,255,1.0)',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  slider_label: {
    fontSize: 14,
    marginLeft: 15,
    // backgroundColor: '#0ff4',
  },
  slider: {
    width: 290,
    height: 40,
    marginTop: -5,
    marginBottom: 20,
    // backgroundColor: '#ff04',
  },
  slider_values: {
    fontSize: 14,
    marginTop: -30,
    // backgroundColor: '#f774',
  },
  checkbox: {
    margin: 10,
  },
});

