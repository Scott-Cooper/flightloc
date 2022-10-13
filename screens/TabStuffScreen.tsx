import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native';
import state from '../util/state';


export default function TabStuffScreen() {


  const fake_fetch = async (url: string) => {
    console.log('fake_fetch running')
    try {
      const response = await fetch(url)
      console.log('fetch_api:', url)
    } catch (e) {
      console.log('fetch_api error:', e)
    }
  }
  

  const fake_dump = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/dump_it_all_or_else')
  }

  const fake_clear = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/clear_it_all_or_else')
  }

  const fake_bootbarn = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/loc?key=135&user=Boot%20Barn&lat=37.671257&long=-97.417910&alt=1270&heading=125&speed=24.86&accuracy=17.2&alt_accuracy=35&max_distance=60&max_lag=20000&min_speed=-1')
  }


  const fake_vortac = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/loc?key=205&user=Vortac&lat=37.745261&long=-97.583838&alt=1278&heading=182&speed=8.23&accuracy=19&alt_accuracy=79&max_distance=60&max_lag=20000&min_speed=-1')
  }

  
  const fake_field = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/loc?key=123&user=Field&lat=37.668453&long=-97.701083&alt=1302&heading=45&speed=27.49&accuracy=36&alt_accuracy=143&max_distance=60&max_lag=20000&min_speed=-1')
  }


  const fake_norwich = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/loc?key=117&user=Norwich&lat=37.457929&long=-97.835638&alt=1200&heading=0&speed=24.3&accuracy=16.2&alt_accuracy=13&max_distance=20&max_lag=20000&min_speed=5')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make pretend pilots:</Text>
      <View style={styles.separator} />
      <Button title="Fake Boot Barn" onPress={fake_bootbarn} />
      <View style={styles.separator} />
      <Button title="Fake Vortac" onPress={fake_vortac} />
      <View style={styles.separator} />
      <Button title="Fake Field" onPress={fake_field} />
      <View style={styles.separator} />
      <Button title="Fake Norwich" onPress={fake_norwich} />
      <View style={styles.separator} />
      <View style={styles.separator} />
      <View style={styles.separator} />
      <Button title="Clear all records" onPress={fake_clear} />
      {/* <Text style={styles.mono}>{JSON.stringify(state.apidata)}</Text> */}
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  mono: {
    fontSize: 11,
    fontFamily: 'space-mono',
  },
});
