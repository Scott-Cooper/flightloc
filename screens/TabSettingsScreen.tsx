import { Text, View } from '../components/Themed'
import { StyleSheet, ScrollView, Switch, TextInput, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider'
import state from '../util/state'
import { saveSettings } from '../util/storage'
import { speakAnything } from './TabSpeechScreen'


export default function TabSettingsScreen() {

  const [keycode, setkeycode] = useState('')
  const [user, setuser] = useState('')
  const [isIncludeCollision, setIsIncludeCollision] = useState(false)
  const [isIncludeBearing, setIsIncludeBearing] = useState(false)
  const [isIncludeAltitude, setIsIncludeAltitude] = useState(false)
  const toggleSwitch1 = () => setIsIncludeCollision(previousState => !previousState)
  const toggleSwitch2 = () => setIsIncludeBearing(previousState => !previousState)
  const toggleSwitch3 = () => setIsIncludeAltitude(previousState => !previousState)

  const [gpsUpdatesPerMinute, setGpsUpdatesPerMinute] = useState(1)
  const [maxDistance, setMaxDistance] = useState(1)
  const [maxLag, setMaxLag] = useState(1)
  const [minSpeed, setMinSpeed] = useState(1)
  const [maxContacts, setMaxContacts] = useState(1)
  const [speechVoice, setSpeechVoice] = useState(1)
  const [speechRate, setSpeechRate] = useState(1)
  const [speechPitch, setSpeechPitch] = useState(1)


  useEffect(() => {
    // Run once during load
    retreive_all_settings()
  }, [])


  function save_all_settings() {
    state.settings.keycode = keycode
    state.settings.user = user
    state.settings.isIncludeCollision = isIncludeCollision
    state.settings.isIncludeBearing = isIncludeBearing
    state.settings.isIncludeAltitude = isIncludeAltitude
    state.settings.gpsUpdatesPerMinute = gpsUpdatesPerMinute
    state.settings.maxDistance = maxDistance
    state.settings.maxLag = maxLag
    state.settings.minSpeed = minSpeed
    state.settings.maxContacts = maxContacts
    state.settings.speechVoice = speechVoice
    state.settings.speechRate = speechRate
    state.settings.speechPitch = speechPitch
    console.log("save_all_settings:  state.settings: ", state.settings)
    saveSettings()
  }


  function retreive_all_settings() {
    console.log("retreive_all_settings running")
    setkeycode(state.settings.keycode)
    setuser(state.settings.user)
    setIsIncludeCollision(state.settings.isIncludeCollision)
    setIsIncludeBearing(state.settings.isIncludeBearing)
    setIsIncludeAltitude(state.settings.isIncludeAltitude)
    setGpsUpdatesPerMinute(state.settings.gpsUpdatesPerMinute)
    setMaxDistance(state.settings.maxDistance)
    setMaxLag(state.settings.maxLag)
    setMinSpeed(state.settings.minSpeed)
    setMaxContacts(state.settings.maxContacts)
    setSpeechVoice(state.settings.speechVoice)
    setSpeechRate(state.settings.speechRate)
    setSpeechPitch(state.settings.speechPitch)
    console.log("retreive_all_settings:  state.settings: ", state.settings)
  }


  function test_speech() {
    speakAnything('settings test', 'Bryant 5.3 miles at 3 oclock')
    setSpeechVoice(speechVoice)
  }

  console.log("render TabSettingsScreen")
  // console.log("state:", state)
  

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
            thumbColor={isIncludeCollision ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isIncludeCollision}
          />
          <Text style={styles.paragraph}>Include collision warning</Text>
          {/* <Text>{isIncludeCollision ? ', On' : ', Off'}</Text> */}
        </View>

        <View style={styles.section}>
          <Switch
            trackColor={{ false: '#777', true: '#8cf' }}
            thumbColor={isIncludeBearing ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isIncludeBearing}
          />
          <Text style={styles.paragraph}>Include absolute bearing</Text>
          {/* <Text>{isIncludeBearing ? ', On' : ', Off'}</Text> */}
        </View>

        <View style={styles.section}>
          <Switch
            trackColor={{ false: '#777', true: '#8cf' }}
            thumbColor={isIncludeAltitude ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isIncludeAltitude}
          />
          <Text style={styles.paragraph}>Include altitude</Text>
          {/* <Text>{isIncludeAltitude ? ', On' : ', Off'}</Text> */}
        </View>

        <View style={styles.separator} lightColor="#333" darkColor="#444" />

        <Text style={styles.slider_label}>Number of GPS updates per minute.  Higher values will decrease lag, but increase battery drain. </Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={30}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={gpsUpdatesPerMinute}
            step={1}
            onValueChange={ (sliderGpsUpdatesPerMinute) => setGpsUpdatesPerMinute(sliderGpsUpdatesPerMinute) }
          />
          <Text style={styles.slider_values}>{gpsUpdatesPerMinute}</Text>
        </View>

        <Text style={styles.slider_label}>Ignore contacts beyond this distance (default 25 miles)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={100}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={maxDistance}
            step={1}
            onValueChange={ (sliderMaxDistance) => setMaxDistance(sliderMaxDistance) }
          />
          <Text style={styles.slider_values}>{maxDistance}</Text>
        </View>

        <Text style={styles.slider_label}>Ignore contacts older than (default 30 seconds)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={120}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={maxLag}
            step={1}
            onValueChange={ (sliderMaxLag) => setMaxLag(sliderMaxLag) }
          />
          <Text style={styles.slider_values}>{maxLag}</Text>
        </View>

        <Text style={styles.slider_label}>Ignore contacts slower than (default 3 mph)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={20}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={minSpeed}
            step={1}
            onValueChange={ (sliderMinSpeed) => setMinSpeed(sliderMinSpeed) }
          />
          <Text style={styles.slider_values}>{minSpeed}</Text>
        </View>

        <Text style={styles.slider_label}>Maximum contacts to report (default 10)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={maxContacts}
            step={1}
            onValueChange={ (sliderMaxContacts) => setMaxContacts(sliderMaxContacts) }
          />
          <Text style={styles.slider_values}>{maxContacts}</Text>
        </View>

        <Text style={styles.slider_label}>Speech Voice  (default 1)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={state.availableVoices.length - 1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={speechVoice}
            step={1}
            onValueChange={ (sliderSpeechVoice) => setSpeechVoice(sliderSpeechVoice) }
          />
          <Text style={styles.slider_values}>{speechVoice}</Text>
        </View>

        <Text style={styles.slider_label}>Speech Rate  (default 1.0)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0.7}
            maximumValue={2.5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={speechRate}
            step={0.1}
            onValueChange={ (sliderSpeechRate) => setSpeechRate(sliderSpeechRate) }
          />
          <Text style={styles.slider_values}>{speechRate}</Text>
        </View>

        <Text style={styles.slider_label}>Speech Pitch  (default 1.0)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={speechPitch}
            step={0.1}
            onValueChange={ (sliderSpeechPitch) => setSpeechPitch(sliderSpeechPitch) }
          />
          <Text style={styles.slider_values}>{speechPitch}</Text>
        </View>

        <Button title="Save" onPress={save_all_settings} />
        <View style={styles.separator}/>
        <Button title="Test Voice" onPress={test_speech} />
      </ScrollView>
    </View>
  )
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
})

