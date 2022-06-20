import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import * as Speech from 'expo-speech';
import state from '../util/state';


const is_speaking = async () => {
  const s = await Speech.isSpeakingAsync()
  state.still_speaking = s
  return (s)
}
export { is_speaking }


const speakAnything = (func: string, phrase: string) => {
  let s = state.settings;
  // let x = Speech.VoiceQuality
  // console.log("voicequaliity:", x)
  // let v = getVoices()
  // Speech.stop()

  is_speaking()
  if (state.still_speaking) {
    console.log(func, 'is_speaking', state.still_speaking)
  } else {
    if( phrase == '') { 
      console.log(func, 'nothing is say')
      return
    }
    Speech.speak(phrase, {voice: "en-us-x-iom-local", pitch: s.speechPitch, rate: s.speechRate})
    // Speech.speak(phrase, {pitch: s.speechPitch, rate: s.speechRate})
    Speech.getAvailableVoicesAsync
    console.log(func, phrase)
    console.log(func, 'voice =', s.speechVoice, 'rate =', s.speechRate, 'and pitch =', s.speechPitch)
  }
  // console.log('still_speaking', state.still_speaking)

}
export { speakAnything }


export default function TabSpeechScreen() {

  const speak1 = () => {
    speakAnything('speak1', 'Chris, 1.2 miles at 4 oclock high.  Mark 2.0 miles at 12 oclock level.')
  };

  const speak2 = () => {
    speakAnything('speak2', 'Hey Scott, L Z is 2.4 miles at 7 oclock.  24 minutes till sunset.')
  };

  const speak3 = () => {
    speakAnything('speak3', 'Ben is offline')
  };
  
  const speak4 = () => {
    speakAnything('speak4', 'Current information is not available.')
  };
  
  const speak5 = () => {
    speakAnything('speak5', 'Oh shit.  danger, danger, danger, death is very likely, turn or do something you stupid dip shit.')
  };


  const getVoices = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    
    let filtered = availableVoices.filter(function(value, index, arr){ 
        return value.language == "en-GB" || value.language == "en-US" || value.language == "en-AU";
    });

    // console.log("filtered:", filtered);
    console.log("filtered:", filtered.length);
    // console.log("availableVoices:", availableVoices);
    return(filtered)
  }

  // "en-au-x-aua-network"

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
