import { Text, View } from '../components/Themed'
import { StyleSheet, Button } from 'react-native'
import state from '../util/state'
import { speakAnything } from '../util/speech'


export default function TabSpeechScreen() {
 
  const speak1 = () => {
    speakAnything('speak1', 'Chris, 1.2 miles at 4 oclock high.  Mark 2.0 miles at 12 oclock level.')
  }

  const speak2 = () => {
    speakAnything('speak2', 'Hey ' + state.settings.user + ', landing zone is 2.4 miles at 7 oclock.  24 minutes till sunset.')
  }

  const speak3 = () => {
    speakAnything('speak3', 'Greg is offline')
  }
  
  const speak4 = () => {
    speakAnything('speak4', 'Current information is not available.')
  }
  
  const speak5 = () => {
    speakAnything('speak5', 'Oh shit.  danger, danger, danger, death is very likely, turn or do something you stupid dip shit.')
  }


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
  )
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
})

