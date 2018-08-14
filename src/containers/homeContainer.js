import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Config from '../common/config/config.js';
import {
  scaleSize,
  scaleFont
} from '../common/config/screenSize';
import { connect } from 'react-redux';
import {
  getWeatherState,
} from '../reducers/index.js';

import {
  getWeather,
} from '../actions/index';

type Props = {};

const mapStateToProps = (state) => {
  return {
    weather: getWeatherState(state),
  };
}

class HomeContainer extends Component<Props> {

  componentDidMount() {

    // xg 测试
    // this.props.getWeather()
    console.log(scaleSize(24))
    console.log(scaleFont(24))
  }

  render() {
    console.log('weather', this.props.weather)
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

export default connect(
  mapStateToProps,
  {
    getWeather,
  }
)(HomeContainer);
