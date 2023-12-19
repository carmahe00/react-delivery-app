module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-paper/babel',
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": true
    }]
  ],
};
