import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Stopwatch extends Component {
  componentWillMount() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.setState({
      mainTime: 0,
      subTime: 0,
      timerOn: false,
      dataSource: ds.cloneWithRows(['row1', 'row2']),
    })
  }

  render() {
    console.log(this.state)
    return (
      <View style={day1Style.container}>
        <View style={{height: 60}}></View>
        <Header mainTime={this.state.mainTime}/>
        <Buttons
          startTime={this._startTime}
          stopTime={this._stopTime}
          stopWatch={this}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          initialListSize={4}
        />
        <Text>{this.state.mainTime}</Text>
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <View style={day1Style.timeline}>
        <Text>{rowData}</Text>
      </View>
    )
  }

  _genRow() {
    return (
      "helllo"
    )
  }

  _startTime(){
    if (!this.state.timerOn){
      var timer = setInterval(() => {
        let mainTime = this.state.mainTime
        let subTime = this.state.subTime

        this.setState({
          mainTime: mainTime + 1,
          subTime: subTime + 1,
        })
      }, 100)

      this.setState({
        timer: timer,
        timerOn: true,
      })
    }
  }

  _stopTime() {
    clearInterval(this.state.timer)

    this.setState({
      timerOn: false,
    })
  }
}

class Header extends Component {
  render() {
    return (
      <View style={day1Style.header}>
        <Text>
          12:34.56
        </Text>
        <Text>
          {this.props.mainTime}
        </Text>
      </View>
    )
  }
}

class Buttons extends Component {
  render() {
    return (
      <View style={day1Style.buttons}>
        <TouchableOpacity
          style={day1Style.button}
          onPress={this.props.startTime.bind(this.props.stopWatch)}>
          <Text>
            start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={day1Style.button}
          onPress={this.props.stopTime.bind(this.props.stopWatch)}>
          <Text>
            End
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


day1Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ivory',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  timeline: {
    height: 30,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
