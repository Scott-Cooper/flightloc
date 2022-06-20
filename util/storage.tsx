import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { Settings } from 'react-native';
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


// const saveSettings = async(varName: any, keyName: string) => {
// function saveSettings (varName: any, keyName: string) {
//     try {
//       const jsonValue = JSON.stringify(varName)
//       console.log("save_setting,", keyName, typeof varName, varName, jsonValue)
//       // console.log("save_setting,", keyName, JSON.stringify(jsonValue, null, 2))
//       AsyncStorage.setItem(keyName, jsonValue)
//     } catch (e) {
//       console.log('save_setting, failed: ', e)
//     }
// }
// export { saveSettings };

const saveSettings = async () => {
  console.log('Before saveSetting,', state.settings)
  storeDataValue ('settings_keycode', state.settings.keycode)
  storeDataValue ('settings_user', state.settings.user)
  storeDataValue ('settings_isEnabled1',  JSON.stringify(state.settings.isEnabled1))
  storeDataValue ('settings_isEnabled2',  JSON.stringify(state.settings.isEnabled2))
  storeDataValue ('settings_isEnabled3',  JSON.stringify(state.settings.isEnabled3))
  storeDataValue ('settings_gpsUpdatesPerMinute',  JSON.stringify(state.settings.gpsUpdatesPerMinute))
  storeDataValue ('settings_sliderValue',  JSON.stringify(state.settings.sliderValue))
  storeDataValue ('settings_speechVoice',  JSON.stringify(state.settings.speechVoice))
  storeDataValue ('settings_speechRate',  JSON.stringify(state.settings.speechRate))
  storeDataValue ('settings_speechPitch',  JSON.stringify(state.settings.speechPitch))
}
export { saveSettings };


const getSettings = async () => {
  console.log("getSettings");
  state.settings.keycode = await AsyncStorage.getItem('settings_keycode')
  state.settings.user = await AsyncStorage.getItem('settings_user')
  state.settings.isEnabled1 = eval(await AsyncStorage.getItem('settings_isEnabled1'))
  state.settings.isEnabled2 = eval(await AsyncStorage.getItem('settings_isEnabled2'))
  state.settings.isEnabled3 = eval(await AsyncStorage.getItem('settings_isEnabled3'))
  state.settings.gpsUpdatesPerMinute = eval(await AsyncStorage.getItem('settings_gpsUpdatesPerMinute'))
  state.settings.sliderValue = eval(await AsyncStorage.getItem('settings_sliderValue'))
  state.settings.speechVoice = eval(await AsyncStorage.getItem('settings_speechVoice'))
  state.settings.speechRate = eval(await AsyncStorage.getItem('settings_speechRate'))
  state.settings.speechPitch= eval(await AsyncStorage.getItem('settings_speechPitch'))
  console.log('After getSettings,', state.settings)
}
export { getSettings };






  const retreive_setting = async (varName: any, setFunc: any, keyName: string) => {
    // try {
      let jsonValue = await AsyncStorage.getItem(keyName)
      console.log("jjj", jsonValue);
      // jsonValue != null ? JSON.parse(jsonValue) : null;

      if(jsonValue != null) {
        // setFunc(eval(jsonValue))
        console.log("got here 333");
        // setAllSettings(JSON.parse(jsonValue))
      }

      // console.log("retreive_setting,", keyName, JSON.stringify(jsonValue, null, 2) );
      
      console.log("retreive_setting,", keyName, JSON.stringify(jsonValue) );
      // console.log("iii: ", allSettings);
    // } catch(e) {
    //   console.log('retreive_setting, failed: ', e)
    // }
  }





const clearAppData = async function() {
  try {
    console.log('clearAppData');
    const keys = await AsyncStorage.getAllKeys();
    console.log('keys:', keys)
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
      console.error('Error clearing app data.');
  }
}
export { clearAppData };


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


