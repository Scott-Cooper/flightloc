import AsyncStorage from '@react-native-async-storage/async-storage';
import state from '../util/state';

  
const saveSettings = async () => {
  console.log('saveSetting')
  // console.log('Before saveSetting,', state.settings)
  storeDataValue ('settings_keycode', state.settings.keycode)
  storeDataValue ('settings_user', state.settings.user)
  storeDataValue ('settings_isIncludeCollision',  JSON.stringify(state.settings.isIncludeCollision))
  storeDataValue ('settings_isIncludeBearing',  JSON.stringify(state.settings.isIncludeBearing))
  storeDataValue ('settings_isIncludeAltitude',  JSON.stringify(state.settings.isIncludeAltitude))
  storeDataValue ('settings_gpsUpdatesPerMinute',  JSON.stringify(state.settings.gpsUpdatesPerMinute))
  storeDataValue ('settings_sliderValue',  JSON.stringify(state.settings.sliderValue))
  storeDataValue ('settings_speechVoice',  JSON.stringify(state.settings.speechVoice))
  storeDataValue ('settings_speechRate',  JSON.stringify(state.settings.speechRate))
  storeDataValue ('settings_speechPitch',  JSON.stringify(state.settings.speechPitch))
}
export { saveSettings };


const getSettings = async () => {
  // console.log("getSettings");
  state.settings.keycode = await AsyncStorage.getItem('settings_keycode')
  state.settings.user = await AsyncStorage.getItem('settings_user')
  state.settings.isIncludeCollision = eval(await AsyncStorage.getItem('settings_isIncludeCollision'))
  state.settings.isIncludeBearing = eval(await AsyncStorage.getItem('settings_isIncludeBearing'))
  state.settings.isIncludeAltitude = eval(await AsyncStorage.getItem('settings_isIncludeAltitude'))
  state.settings.gpsUpdatesPerMinute = eval(await AsyncStorage.getItem('settings_gpsUpdatesPerMinute'))
  state.settings.sliderValue = eval(await AsyncStorage.getItem('settings_sliderValue'))
  state.settings.speechVoice = eval(await AsyncStorage.getItem('settings_speechVoice'))
  state.settings.speechRate = eval(await AsyncStorage.getItem('settings_speechRate'))
  state.settings.speechPitch = eval(await AsyncStorage.getItem('settings_speechPitch'))
  console.log('getSettings,', state.settings)
}
export { getSettings };


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


