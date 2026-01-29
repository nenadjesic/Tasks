module.exports = {
  preset: 'react-native',

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },

  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-element-dropdown|@react-native-community)/)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};


