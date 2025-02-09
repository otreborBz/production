// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'mjs'],
    extraNodeModules: {
      ...config.resolver.extraNodeModules,
      '@react-native-community/datetimepicker': '@react-native-community/datetimepicker'
    }
  }
};
