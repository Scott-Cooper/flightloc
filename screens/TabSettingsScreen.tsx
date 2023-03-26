import { Text, View } from '../components/Themed'
import { StyleSheet, ScrollView, Switch, TextInput, Button} from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import state from '../util/state'
import { saveSettings } from '../util/storage'
import { speakAnything } from '../util/speech'


export default function TabSettingsScreen() {

  const [keycode, setkeycode] = useState(state.settings.keycode)
  const [user, setuser] = useState(state.settings.user)
  const [isIncludeCollision, setIsIncludeCollision] = useState(state.settings.isIncludeCollision)
  const [isIncludeBearing, setIsIncludeBearing] = useState(state.settings.isIncludeBearing)
  const [isIncludeCourse, setIsIncludeCourse] = useState(state.settings.isIncludeCourse)
  const [isIncludeAltitude, setIsIncludeAltitude] = useState(state.settings.isIncludeAltitude)
  const [isRelativeClock, setIsRelativeClock] = useState(state.settings.isRelativeClock)
  const [gpsUpdateTime, setGpsUpdateTime] = useState(state.settings.gpsUpdateTime)
  const [maxDistance, setMaxDistance] = useState(state.settings.maxDistance)
  const [maxLag, setMaxLag] = useState(state.settings.maxLag)
  const [minSpeed, setMinSpeed] = useState(state.settings.minSpeed)
  const [maxContacts, setMaxContacts] = useState(state.settings.maxContacts)
  const [speechVoice, setSpeechVoice] = useState(state.settings.speechVoice)
  const [speechRate, setSpeechRate] = useState(state.settings.speechRate)
  const [speechPitch, setSpeechPitch] = useState(state.settings.speechPitch)
  const toggleSwitch1 = () => setIsIncludeCollision(previousState => !previousState)
  const toggleSwitch2 = () => setIsIncludeBearing(previousState => !previousState)
  const toggleSwitch3 = () => setIsIncludeCourse(previousState => !previousState)
  const toggleSwitch4 = () => setIsIncludeAltitude(previousState => !previousState)
  const toggleSwitch5 = () => setIsRelativeClock(previousState => !previousState)


  function save_all_settings() {
    state.settings.keycode = keycode
    state.settings.user = user
    state.settings.isIncludeCollision = isIncludeCollision
    state.settings.isIncludeBearing = isIncludeBearing
    state.settings.isIncludeCourse = isIncludeCourse
    state.settings.isIncludeAltitude = isIncludeAltitude
    state.settings.isRelativeClock = isRelativeClock
    state.settings.gpsUpdateTime = gpsUpdateTime
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


  function test_speech() {
    speakAnything('settings test', 'Bryant 5.3 miles at 3 oclock')
    setSpeechVoice(speechVoice)
  }

  
  console.log("render TabSettingsScreen")
  

  return (
    <View style={styles.container}>
      {/* <View style={styles.separator} lightColor="#333" darkColor="#444" /> */}
    
      <ScrollView style={styles.scrollView}>

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

        <View style={styles.separator} lightColor="#333" darkColor="#444" />

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
            thumbColor={isIncludeCourse ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isIncludeCourse}
          />
          <Text style={styles.paragraph}>Include absolute course</Text>
          {/* <Text>{isIncludeCourse ? ', On' : ', Off'}</Text> */}
        </View>

        <View style={styles.section}>
          <Switch
            trackColor={{ false: '#777', true: '#8cf' }}
            thumbColor={isIncludeAltitude ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch4}
            value={isIncludeAltitude}
          />
          <Text style={styles.paragraph}>Include altitude</Text>
          {/* <Text>{isIncludeAltitude ? ', On' : ', Off'}</Text> */}
        </View>

        <View style={styles.section}>
          <Switch
            trackColor={{ false: '#777', true: '#8cf' }}
            thumbColor={isRelativeClock ? '#0bf' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch5}
            value={isRelativeClock}
          />
          <Text style={styles.paragraph}>Relative clock directions</Text>
          {/* <Text>{isRelativeClock ? ', On' : ', Off'}</Text> */}
        </View>

        <View style={styles.separator} lightColor="#333" darkColor="#444" />

        <Text style={styles.slider_label}>Seconds between GPS updates.  Lower values will decrease lag, but increase battery drain. Requires app reload. (default 3.0 seconds)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={0.6}
            maximumValue={6.0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={gpsUpdateTime}
            step={0.1}
            onValueChange={ (sliderGpsUpdateTime) => setGpsUpdateTime(sliderGpsUpdateTime) }
          />
          <Text style={styles.slider_values}>{gpsUpdateTime.toFixed(1)}</Text>
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

        <Text style={styles.slider_label}>Maximum contacts to report (default 3)</Text>
        <View style={styles.section}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a0a0a0"
            value={maxContacts}
            step={1}
            onValueChange={ (sliderMaxContacts) => setMaxContacts(sliderMaxContacts) }
          />
          <Text style={styles.slider_values}>{maxContacts}</Text>
        </View>

        <Text style={styles.slider_label}>Speech Voice  (default 0)</Text>
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

        <Text style={styles.slider_label}>Speech Rate  (default 1.3)</Text>
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
          <Text style={styles.slider_values}>{speechRate.toFixed(1)}</Text>
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
          <Text style={styles.slider_values}>{speechPitch.toFixed(1)}</Text>
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
