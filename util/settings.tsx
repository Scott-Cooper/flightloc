import AsyncStorage from '@react-native-async-storage/async-storage';


export default {
  isEnabled1: true,
  isEnabled2: false,
  isEnabled3: false,
  sliderValue: 15,
  sliderVolume: 7,
  sliderRate: 1.1,
  sliderPitch: 12.2,

  coords: {
    latitude: 1,
    longitude: 2,
    altitude: 3,
    speed: 4,
    heading: 5,
    accuracy: 6,
    altitudeAccuracy: 7,
    timestamp: 8,
  },
};


// Reading data
// getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
// Reading string value
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}


// Reading object value
const getData2 = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}