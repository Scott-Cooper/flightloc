import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Speech from 'expo-speech';
import state from '../util/state';



const getVoices = async () => {

  // Because of a bug in getAvailableVoicesAsync, we have to call it twice with a short 
  // delay between calls.  Why this works is a mystery to me.  WTF
  await Speech.getAvailableVoicesAsync()
  
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 500);
  });

  const availableVoices = await Speech.getAvailableVoicesAsync()
  // console.log('getVoices voices', availableVoices)
  console.log('getVoices found', availableVoices.length, 'voices before filter')
  let filtered = availableVoices.filter(function(value, index, arr){ 
    return ! value.identifier.includes("network") && (value.language == "en-GB" || value.language == "en-US" || value.language == "en-AU");
  })

  console.log('getVoices found', filtered.length, 'voices after filter')
  state.availableVoices = filtered
  // console.log('getVoices found', state.availableVoices)
}
export { getVoices }


const is_speaking = async () => {
  const s = await Speech.isSpeakingAsync()
  state.still_speaking = s
  return (s)
}
export { is_speaking }


const speakAnything = (func: string, phrase: string) => {
  let s = state.settings;

  is_speaking()
  if (state.still_speaking) {
    console.log(func, 'is_speaking', state.still_speaking)
  } else {
    if( phrase == '') { 
      console.log(func, 'nothing is say')
      return
    }

    console.log('speakAnything:')
    console.log('  ', phrase)
    console.log('   Called from', func, 'using voice', s.speechVoice, state.availableVoices[s.speechVoice].identifier, ' rate', s.speechRate, 'and pitch', s.speechPitch)

    Speech.speak(phrase, {voice: state.availableVoices[s.speechVoice].identifier, pitch: s.speechPitch, rate: s.speechRate})
    // Speech.speak(phrase, {voice: "en-us-x-iom-local", pitch: s.speechPitch, rate: s.speechRate})
    // Speech.speak(phrase, {pitch: s.speechPitch, rate: s.speechRate})
  }
  // console.log('still_speaking', state.still_speaking)
}
export { speakAnything }


export default function TabSpeechScreen() {

  const speak1 = () => {
    speakAnything('speak1', 'Chris, 1.2 miles at 4 oclock high.  Mark 2.0 miles at 12 oclock level.')
  };

  const speak2 = () => {
    speakAnything('speak2', 'Hey ' + state.settings.user + ', L Z is 2.4 miles at 7 oclock.  24 minutes till sunset.')
  };

  const speak3 = () => {
    speakAnything('speak3', 'Greg is offline')
  };
  
  const speak4 = () => {
    speakAnything('speak4', 'Current information is not available.')
  };
  
  const speak5 = () => {
    speakAnything('speak5', 'Oh shit.  danger, danger, danger, death is very likely, turn or do something you stupid dip shit.');
  }


// "en-AU-language"
// "uk-UA-language"
// "en-us-x-tpf-local"
// "en-in-x-end-network"
// "en-au-x-aua-network"
// "en-GB-language"
// "en-in-x-cxx-local"
// "en-gb-x-gba-network"
// "en-au-x-afh-network"
// "en-us-x-sfg-network"
// "en-au-x-aud-local"
// "en-gb-x-gbc-network"
// "en-us-x-sfg-local"
// "en-in-x-ene-local"

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Test</Text> */}
      <Button title="Area" onPress={speak1} />
      <View style={styles.separator} />
      <Button title="Landing Zone" onPress={speak2} />
      <View style={styles.separator} />
      <Button title="Offline" onPress={speak3} />
      <View style={styles.separator} />
      <Button title="No info" onPress={speak4} />
      <View style={styles.separator} />
      <Button title="Danger" onPress={speak5} />
      <View style={styles.separator} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // alignItems: 'center',
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    width: '100%',
  },
});
