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
expo install expo-av \
expo install @react-native-community/slider \
expo install @react-native-async-storage/async-storage \
expo install react-native-maps \
expo install react-native-volume-manager

npm install -g eas-cli \
Increment version number in app.json \
eas build --profile preview --platform android

## Development builds (custom client)
This code uses libraries that are not included in the standard client app (Expo Go).  Therefore \
we must create a development client that is tailored to this project. This will contain only \
the libraries required by our project, and be much smaller than the standard client. \
See:  https://docs.expo.dev/development/introduction/ \
\
expo install expo-dev-client \
eas login \
eas whoami \
eas build --profile development --platform android \
install from qr code \
expo start --dev-client

## Latest builds:
http://dullbits.com/misc/flightloc/

## Random usefull links:
https://reactnativeelements.com/docs \
https://icons.expo.fyi/ \
https://github.com/callstack/react-native-slider \
https://github.com/hirbod/react-native-volume-manager
