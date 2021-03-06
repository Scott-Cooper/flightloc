/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabHome: {
            screens: {
              TabHomeScreen: 'home',
            },
          },
          TabSettings: {
            screens: {
              TabSettingsScreen: 'settings',
            },
          },
          TabLocation: {
            screens: {
              TabLocationScreen: 'location',
            },
          },
          TabSpeech: {
            screens: {
              TabSpeechScreen: 'speech',
            },
          },
          TabStuff: {
            screens: {
              TabStuffScreen: 'stuff',
            },
          },
          TabTest: {
            screens: {
              TabTestScreen: 'test',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
