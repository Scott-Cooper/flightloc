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
          TabStuff: {
            screens: {
              TabStuffScreen: 'stuff',
            },
          },
          TabAbout: {
            screens: {
              TabStuffScreen: 'about',
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
