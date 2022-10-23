import { Text, View } from '../components/Themed'
import { StyleSheet, Button } from 'react-native'
import state from '../util/state'


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


  const fake_vortac = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/loc?key=fake205&user=Vortac&lat=37.745261&long=-97.583838&alt=1278&heading=182&speed=8.23&accuracy=19&alt_accuracy=79&max_distance=60&max_lag=20000&min_speed=-1')
  }

  
  const fake_field = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/loc?key=fake923&user=Field&lat=37.668453&long=-97.701083&alt=1302&heading=45&speed=27.49&accuracy=36&alt_accuracy=143&max_distance=60&max_lag=20000&min_speed=-1')
  }


  const fake_norwich = async() => {
    fake_fetch('https://flightloc.pythonanywhere.com/loc?key=fake117&user=Norwich&lat=37.457929&long=-97.835638&alt=1200&heading=0&speed=24.3&accuracy=16.2&alt_accuracy=13&max_distance=20&max_lag=20000&min_speed=5')
  }


  function make_fake_kevin() {
    make_fake_pilot('fake773', 'Kevin')
  }


  function make_fake_karen() {
    make_fake_pilot('fake377', 'Karen')
  }


  function make_fake_pilot(r_key: string, r_name: string) {
    // Be sure to get our own GPS fix before using this button.
    // This will always be relative to the last person to press it.
    var r_lat =  (state.coords.latitude + Math.random()*0.2-0.1).toFixed(4).toString()
    var r_long = (state.coords.longitude + Math.random()*0.2-0.1).toFixed(4).toString()
    var r_alt =  (state.coords.altitude + Math.random()*1000-500).toFixed(4).toString()
    var r_head =  (Math.random()*365).toFixed(4).toString()
    var r_speed =  (Math.random()*20+10).toFixed(4).toString()
    var pilot_url ='https://flightloc.pythonanywhere.com/loc?key=' + r_key + '&user=' + r_name + '&lat=' + r_lat + '&long=' + r_long + '&alt=' + r_alt + '&heading=' + r_head + '&speed=' + r_speed + '&accuracy=17.0&alt_accuracy=30&max_distance=50&max_lag=20000&min_speed=-1'
    fake_fetch(pilot_url)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make pretend pilots:</Text>
      <View style={styles.separator} />
      <Button title="Fake Vortac" onPress={fake_vortac} />
      <View style={styles.separator} />
      <Button title="Fake Field" onPress={fake_field} />
      <View style={styles.separator} />
      <Button title="Fake Norwich" onPress={fake_norwich} />
      <View style={styles.separator} />
      <Button title="Fake Kevin" onPress={make_fake_kevin} />
      <View style={styles.separator} />
      <Button title="Fake Karen" onPress={make_fake_karen} />
      <View style={styles.separator} />
      <View style={styles.separator} />
      <View style={styles.separator} />
      <Button title="Clear all records" onPress={fake_clear} />
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
  mono: {
    fontSize: 11,
    fontFamily: 'space-mono',
  },
})
