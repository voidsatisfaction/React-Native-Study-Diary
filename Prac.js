import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import styles from './style/style'

export default class Prac extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 64}}></View>
        <View style={{height: 100}}>
          <Text>
            Welcome to Prac site!
          </Text>
        </View>
      </View>
    );
  }
}
