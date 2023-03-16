import * as Speech from 'expo-speech'
import state from '../util/state'
import { VolumeManager } from 'react-native-volume-manager'
import { Audio } from 'expo-av'


///////////////////////////////////////////////////////////////////////////////
const getVolume = async () => {
  let vol = await VolumeManager.getVolume()
  // console.log('getVolume running  ', Date.now(), vol)
  console.log('getVolume test  ', vol.toString())
  state.oldSpeechVolume = Number(vol.toString())
  // SystemSetting.getVolume().then(currentVolume => console.log(currentVolume))
  return vol
}


///////////////////////////////////////////////////////////////////////////////
const setVolume = async (vol: number) => {
  // console.log('setVolume running  ', Date.now(), vol)
  // await VolumeManager.setVolume(vol)
  await VolumeManager.setVolume(vol, {
    type: 'music',    // defaults to "music" (Android only)
    showUI: false,    // defaults to false, can surpress the native UI Volume Toast (iOS & Android)
    playSound: false, // defaults to false (Android only)
  })
}


///////////////////////////////////////////////////////////////////////////////
const getVoices = async () => {
  // Because of a bug in getAvailableVoicesAsync, we have to call it twice with
  // a short delay between calls.  Why this works is a mystery to me.  WTF

  await Speech.getAvailableVoicesAsync()
  
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 1000)
  })

  const availableVoices = await Speech.getAvailableVoicesAsync()
  // console.log('getVoices voices', availableVoices)
  console.log('getVoices found', availableVoices.length, 'voices before filter')
  let filtered = availableVoices.filter(function(value, index, arr){ 
    return ! value.identifier.includes("local") && (value.language == "en-GB" || value.language == "en-US" || value.language == "en-AU")
    // return ! value.identifier.includes("network") && (value.language == "en-GB" || value.language == "en-US" || value.language == "en-AU")
  })

  console.log('getVoices found', filtered.length, 'voices after filter')
  state.availableVoices = filtered
  state.still_speaking = false
}
export { getVoices }


///////////////////////////////////////////////////////////////////////////////
const speakAnything = async (func: string, phrase: string) => {
  // Because Speech.speak does not duck the volume of other applications
  // correctly, we first start playing a single sample silent mp3.  Then in
  // the callback of the Speech.speak we unload the mp3 and the normal volume
  // of background music app resumes.

  let s = state.settings
  let duckAudio = new Audio.Sound()

  const onDoneCallBack = () => {
    console.log('   done speaking')
    duckAudio.unloadAsync()
  
    // setVolume(state.oldSpeechVolume)
    state.still_speaking = false
  }

  if (state.still_speaking) {
    // console.log('  ', func, 'still speaking')
    return
  }
  
  if( phrase == '') { 
    // console.log('  ', func, 'nothing to say')
    return
  }

  state.still_speaking = true
  console.log('speakAnything')
  console.log("   phrase: " + phrase)
  // console.log("state.availableVoices: " + state.availableVoices)
  console.log("   s.speechVoice: " + s.speechVoice)
  console.log('   called from', func, 'using voice', s.speechVoice, state.availableVoices[s.speechVoice].identifier, ' rate', s.speechRate, 'and pitch', s.speechPitch)

  await duckAudio.loadAsync(require('../assets/sounds/shortest_possible.mp3'))
  await duckAudio.playAsync()

  Speech.speak(phrase, 
    {
      voice: state.availableVoices[s.speechVoice].identifier, 
      pitch: s.speechPitch, 
      rate: s.speechRate,
      onDone: () => onDoneCallBack()
    }
  )
  // Speech.speak(phrase, {voice: "en-us-x-iom-local", pitch: s.speechPitch, rate: s.speechRate})
  // Speech.speak(phrase, {pitch: s.speechPitch, rate: s.speechRate})
}
export { speakAnything }


///////////////////////////////////////////////////////////////////////////////

