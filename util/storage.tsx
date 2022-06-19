import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import state from '../util/state';

  
const getVoices = async () => {
  const availableVoices = await Speech.getAvailableVoicesAsync();
  
  let filtered = availableVoices.filter(function(value, index, arr){ 
      return value.language == "en-GB" || value.language == "en-US" || value.language == "en-AU";
  });

  console.log("filtered:", filtered);
  console.log("filtered length:", filtered.length);
  // console.log("availableVoices:", availableVoices);
}


const saveSettings = async(varName: any, keyName: string) => {
    try {
      const jsonValue = JSON.stringify(varName)
      console.log("save_setting,", keyName, typeof varName, varName, jsonValue)
      // console.log("save_setting,", keyName, JSON.stringify(jsonValue, null, 2))
      AsyncStorage.setItem(keyName, jsonValue)
    } catch (e) {
      console.log('save_setting, failed: ', e)
    }
}
export { saveSettings };


function getSettings() {
  console.log("getSettings");
  state.settings = getDataObject('settings')
  console.log("settings:", state);
}
export { getSettings };


const storeDataValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log('storeDataValue, failed: ', e)
  }
}


const storeDataObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    if(jsonValue != null) {
      eval(jsonValue)
      console.log("got here 333");
      // setAllSettings(JSON.parse(jsonValue))
    }
  } catch (e) {
    console.log('storeDataObject, failed: ', e)
  }
}


const getDataValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    console.log('getDataValue, failed: ', e)
  }
}


const getDataObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log('getDataObject, failed: ', e)
  }
}


