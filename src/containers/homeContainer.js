/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Config from '../common/config/config.js';
import {
  scaleSize,
  scaleFont
} from '../common/config/screenSize';

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    console.log(scaleSize(24))
    console.log(scaleFont(24))
    fetch(`${ Config.host }/userInfo?userId=1`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to wmApp</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
