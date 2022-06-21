import { Text, View } from '../components/Themed';
import { StyleSheet, ScrollView, Switch, TextInput, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import state from '../util/state';
import { saveSettings } from '../util/storage';

export default function TabSettingsScreen() {

  const [keycode, setkeycode] = useState('');
  const [user, setuser] = useState('Unknown');
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);

  const [gpsUpdatesPerMinute, setGpsUpdatesPerMinute] = useState(6);
  const [sliderValue, setSliderValue] = useState(15);
  const [speechVoice, setSpeechVoice] = useState(7);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechPitch, setSpeechPitch] = useState(1.0);


  useEffect(() => {
    // Run once during load
    retreive_all_settings();
  }, []);


  function save_all_settings() {
    state.settings.keycode = keycode
    state.settings.user = user
    state.settings.isEnabled1 = isEnabled1
    state.settings.isEnabled2 = isEnabled2;
    state.settings.isEnabled3 = isEnabled3;
    state.settings.gpsUpdatesPerMinute = gpsUpdatesPerMinute;
    state.settings.sliderValue = sliderValue;
    state.settings.speechVoice = speechVoice;
    state.settings.speechRate = speechRate;
    state.settings.speechPitch = speechPitch;

    // console.log("allsettings: ", allSettings);
    console.log("save_all_settings:  state.settings: ", state.settings);
    saveSettings()
  }


  function retreive_all_settings() {
    console.log("retreive_all_settings running");
    setkeycode(state.settings.keycode);
    setuser(state.settings.user);
    setIsEnabled1(state.settings.isEnabled1);
    setIsEnabled2(state.settings.isEnabled2);
    setIsEnabled3(state.settings.isEnabled3);
    setGpsUpdatesPerMinute(state.settings.gpsUpdatesPerMinute);
    setSliderValue(state.settings.sliderValue);
    setSpeechVoice(state.settings.speechVoice);
    setSpeechRate(state.settings.speechRate);
    setSpeechPitch(state.settings.speechPitch);
  }

  console.log("render TabSettingsScreen");
  // console.log("state:", state);
  

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Settings</Text> */}
      <View style={styles.separator} lightColor="#333" darkColor="#444" />
    
      <ScrollView style={styles.scrollView}>

        <View style={styles.section}>
          <Text style={styles.paragraph}>Key code </Text>
          <TextInput
            style={styles.input}
            // onChangeText={text => on_change_keycode(text)}
            onChangeText={text => setkeycode(text)}
            value={keycode}
            placeholder="Key code              "
            placeholderTextColor='#666'
            // selectionColor='#f00'
            // underlineColorAndroid='#f00'
            keyboardType="default"
          />
        </View>

        <View style={styles.separator}/>

        <View style={styles.section}>
          <Text style={styles.paragraph}>Pilot name </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setuser(text)}
            value={user}
            placeholder="Pilot's first name               "
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

        <Text style={styles.slider_label}>Number of GPS updates per minute.  Higher values will decrease lag, but increase battery drain. </Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={60}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={gpsUpdatesPerMinute}
            step={1}
            onValueChange={ (slideGpsUpdatesPerMinute) => setGpsUpdatesPerMinute(slideGpsUpdatesPerMinute) }
          />
          <Text style={styles.slider_values}>{gpsUpdatesPerMinute}</Text>
        </View>

        <Text style={styles.slider_label}>Seconds between location status</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={120}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={sliderValue}
            step={1}
            onValueChange={ (sliderValue) => setSliderValue(sliderValue) }
          />
          <Text style={styles.slider_values}>{sliderValue}</Text>
        </View>

        <Text style={styles.slider_label}>Speech Voice  (default 1)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={47}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={speechVoice}
            step={1}
            onValueChange={ (speechVoice) => setSpeechVoice(speechVoice) }
          />
          <Text style={styles.slider_values}>{speechVoice}</Text>
        </View>

        <Text style={styles.slider_label}>Speech Rate  (default 1.0)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={3.0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={speechRate}
            step={0.01}
            onValueChange={ (sliderRate) => setSpeechRate(sliderRate) }
          />
          <Text style={styles.slider_values}>{speechRate}</Text>
        </View>

        <Text style={styles.slider_label}>Speech Pitch  (default 1.0)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={3.0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={speechPitch}
            step={0.01}
            onValueChange={ (sliderPitch) => setSpeechPitch(sliderPitch) }
          />
          <Text style={styles.slider_values}>{speechPitch}</Text>
        </View>

        <View style={styles.separator} lightColor="#333" darkColor="#444" />
        <Button title="Save" onPress={save_all_settings} />
        <View style={styles.separator} lightColor="#333" darkColor="#444" />
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
    // marginRight: 35,
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
    // marginLeft: 15,
    // marginRight: 35,
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
});

