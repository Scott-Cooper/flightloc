export default {
  settings: {
    keycode: '',
    user: 'Unknown',
    isIncludeCollision: true,
    isIncludeBearing: true,
    isIncludeCourse: true,
    isIncludeAltitude: true,
    isRelativeClock: true,
    gpsUpdateTime: 1,
    maxDistance: 1,
    maxLag: 1,
    minSpeed: 1,
    maxContacts: 1,
    speechVoice: 1,
    speechRate: 1,
    speechPitch: 1,
    speechVolume: 1,
  },
  coords: {
    latitude: 1,
    longitude: 1,
    altitude: 1,
    speed: 1,
    heading: 1,
    accuracy: 1,
    altitudeAccuracy: 1,
    timestamp: 1,
    lasttimestamp: 1,
  },
  still_speaking: false,
  next_thing_to_say: '',
  apidata: [],
  availableVoices: [],
  oldVolume: 0.0,
}
