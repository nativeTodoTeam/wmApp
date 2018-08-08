/** @format */

import {AppRegistry} from 'react-native';
import App from './src/index.js';
import {name as appName} from './app.json';

console.log(App)

AppRegistry.registerComponent(appName, () => App);
