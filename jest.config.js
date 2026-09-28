module.exports = {
  preset: '@react-native/jest-preset',
  // Các package điều hướng phát hành dưới dạng ESM nên cần Babel transform
  transformIgnorePatterns: [
    'node_modules/(?!(?:@react-native|react-native|@react-navigation|react-native-screens|react-native-safe-area-context)/)',
  ],
};
