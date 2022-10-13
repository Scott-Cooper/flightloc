# FlightLoc
This app is used to help powered paraglider pilots find and avoid each other in the sky. \
It is intended to convey all information using only audio thru a bluetooth enabled helmet.


## Development environment:
Install expo.dev found here: https://docs.expo.dev/get-started/installation \
npm install --global expo-cli \
expo whoami \
expo install expo-location \
expo install expo-speech \
expo install expo-checkbox \
expo install @react-native-community/slider \
expo install @react-native-async-storage/async-storage \
expo install react-native-maps \
expo install react-native-volume-manager \

npm install -g eas-cli \
eas login \
eas whoami \
Increment version number in app.json \
eas build --profile preview --platform android

## Development builds (custom client)
### https://docs.expo.dev/development/getting-started/
expo install expo-dev-client \
eas build --profile development --platform android \
install from qr code \
npx expo start \
last build:  https://expo.dev/accounts/xbass/projects/flightloc/builds/5aba809e-f982-4230-90cb-4192b468e88d

## Random usefull links:
https://reactnativeelements.com/docs \
https://icons.expo.fyi/ \
https://github.com/callstack/react-native-slider \
https://github.com/hirbod/react-native-volume-manager

## Latest APK package build:
SDK version:  46.0.0 \
Version:  0.1.3 \
Commit:  545a016 

### How to install this build on Android

On devices running Android 8.0 (API level 26) and higher, you must navigate to the Install unknown apps system settings screen to enable app installations from a particular location (i.e. the web browser you are downloading the app from).
On devices running Android 7.1.1 (API level 25) and lower, you should enable the Unknown sources system setting, found in Settings > Security on your device.

Send and open the URL below to install it on a device.
https://expo.dev/accounts/xbass/projects/flightloc/builds/6e4260db-4149-4a85-b198-339066b78d51
