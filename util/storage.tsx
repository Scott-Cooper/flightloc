import AsyncStorage from '@react-native-async-storage/async-storage'
import state from '../util/state'

  
const saveSettings = async () => {
  console.log('saveSetting')
  // console.log('Before saveSetting,', state.settings)
  storeDataValue ('settings_keycode', state.settings.keycode)
  storeDataValue ('settings_user', state.settings.user)
  storeDataValue ('settings_isIncludeCollision',  JSON.stringify(state.settings.isIncludeCollision))
  storeDataValue ('settings_isIncludeBearing',  JSON.stringify(state.settings.isIncludeBearing))
  storeDataValue ('settings_isIncludeCourse',  JSON.stringify(state.settings.isIncludeCourse))
  storeDataValue ('settings_isIncludeAltitude',  JSON.stringify(state.settings.isIncludeAltitude))
  storeDataValue ('settings_gpsUpdatesPerMinute',  JSON.stringify(state.settings.gpsUpdatesPerMinute))
  storeDataValue ('settings_maxDistance',  JSON.stringify(state.settings.maxDistance))
  storeDataValue ('settings_maxLag',  JSON.stringify(state.settings.maxLag))
  storeDataValue ('settings_minSpeed',  JSON.stringify(state.settings.minSpeed))
  storeDataValue ('settings_maxContacts',  JSON.stringify(state.settings.maxContacts))
  storeDataValue ('settings_speechVoice',  JSON.stringify(state.settings.speechVoice))
  storeDataValue ('settings_speechRate',  JSON.stringify(state.settings.speechRate))
  storeDataValue ('settings_speechPitch',  JSON.stringify(state.settings.speechPitch))
}
export { saveSettings }


const getSettings = async () => {
  // console.log("getSettings")
  
  // https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript/9719815
  let random_keycode = Math.random().toString(36).substr(2, 8)

  state.settings.keycode = await AsyncStorage.getItem('settings_keycode') || random_keycode
  state.settings.user = await AsyncStorage.getItem('settings_user') || 'Unknown'
  state.settings.isIncludeCollision = eval((await AsyncStorage.getItem('settings_isIncludeCollision')) || 'true')
  state.settings.isIncludeBearing = eval((await AsyncStorage.getItem('settings_isIncludeBearing')) || 'true')
  state.settings.isIncludeCourse = eval((await AsyncStorage.getItem('settings_isIncludeCourse')) || 'false')
  state.settings.isIncludeAltitude = eval((await AsyncStorage.getItem('settings_isIncludeAltitude')) || 'false')
  state.settings.isRelativeClock = eval((await AsyncStorage.getItem('settings_isRelativeClock')) || 'true')
  state.settings.gpsUpdatesPerMinute = eval((await AsyncStorage.getItem('settings_gpsUpdatesPerMinute')) || '3')
  state.settings.maxDistance = eval((await AsyncStorage.getItem('settings_maxDistance')) || '25')
  state.settings.maxLag = eval((await AsyncStorage.getItem('settings_maxLag')) || '30.0')
  state.settings.minSpeed = eval((await AsyncStorage.getItem('settings_minSpeed')) || '3.0')
  state.settings.maxContacts = eval((await AsyncStorage.getItem('settings_maxContacts')) || '10')
  state.settings.speechVoice = eval((await AsyncStorage.getItem('settings_speechVoice')) || '0')
  state.settings.speechRate = eval((await AsyncStorage.getItem('settings_speechRate')) || '1.6')
  state.settings.speechPitch = eval((await AsyncStorage.getItem('settings_speechPitch')) || '1.0')
  console.log('getSettings,', state.settings)
}
export { getSettings }


const clearAppData = async function() {
  try {
    console.log('clearAppData')
    const keys = await AsyncStorage.getAllKeys()
    console.log('keys:', keys)
    await AsyncStorage.multiRemove(keys)
  } catch (error) {
      console.error('Error clearing app data.')
  }
}
export { clearAppData }


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
      console.log("got here 333")
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
      return value
      // value previously stored
    }
  } catch(e) {
    console.log('getDataValue, failed: ', e)
  }
}


const getDataObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    console.log('getDataObject, failed: ', e)
  }
}


