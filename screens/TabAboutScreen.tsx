import { Text, View } from '../components/Themed'
import { StyleSheet, ScrollView, Linking} from 'react-native'


export default function TabAboutScreen() {
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Text style={styles.section}>About FlightLoc</Text>
        <Text style={styles.paragraph}>This app is used to help paramotor pilots find and avoid each other in the sky. It is intended to convey all information using only audio thru a bluetooth enabled helmet.</Text>
        <Text style={styles.paragraph}>Flightloc is open source and can be found at 
          <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('https://github.com/Scott-Cooper/flightloc')
            }}> https://github.com/Scott-Cooper/flightloc
          </Text>
        </Text>
        <Text style={styles.paragraph}>Please send questions or comments to Scott Cooper at
          <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('mailto: scottslongemailaddress@gmail.com')
            }}> scottslongemailaddress@gmail.com
          </Text>
        </Text>

        <Text style={styles.section}>Bluetooth Button</Text>
        <Text style={styles.paragraph}>I recommend using a CamKix, Zodiac, Xenvo, or similar remote photo shutter button.</Text>
        <Text style={styles.paragraph}>All of these devices emulate a volume button press, and can be found on Amazon.</Text>

        <Text style={styles.section}>Usage</Text>
        <Text style={styles.paragraph}>Adjust and test volume on the Settings tab.</Text>
        <Text style={styles.paragraph}>Confirm any bluetooth shutter button is turned on, paired and connected.</Text>
        <Text style={styles.paragraph}>Press the volume buttons or bluetooth shutter button 3 times quickly to hear information about nearby contacts.</Text>
        <Text style={styles.paragraph}>Use the Stuff tab to create fake pilots for testing.</Text>

        <Text style={styles.section}>Misc</Text>
        <Text style={styles.paragraph}>Currently there is nothing to prevent a duplicate or inappropriate pilot name.  Don't be a dick.</Text>
        <Text style={styles.paragraph}>This app uses a lot of battery power and will disable the automatic sleeping when on the location tab.</Text>
        <Text style={styles.paragraph}>This app will make very frequent internet requests.  You are responsible of all related data usage charges.</Text>
        <Text style={styles.paragraph}>Currently the Location tab is the only screen that will try to prevent your mobile device from sleeping.  A sleeping device will no longer transmit your GPS coordinates or tell you about other pilots.</Text>

        <Text style={styles.section}>Privacy</Text>
        <Text style={styles.paragraph}>When using this app your last known GPS location will be publicly available.  Currently this app does not keep a history of your location, just the last known location.</Text>

      </ScrollView>
    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    // backgroundColor: "#f8e",
  },
  section: {
    color: "#999",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 0,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 20,
    marginRight: 10,
  },
  hyperlinkStyle: {
    color: '#88f',
  },
})
