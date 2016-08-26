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
    this.setState({
      mainTime: 0,
      subTime: 0,
      totalMainTime: '00 : 00 : 00',
      totalSubTime: '00 : 00 : 00',
      timerOn: false,
      btnNameL: 'Start',
      btnNameR: 'Stop',
      btnFuncL: this._startTime,
      btnFuncR: this._stopTime,
      rowData: [
        {title: '', record: ''},
        {title: '', record: ''},
        {title: '', record: ''},
        {title: '', record: ''}
      ],
      recordCounter: 1,
    })
  }

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    theDataSource = ds.cloneWithRows(this.state.rowData)
    return (
      <View style={day1Style.container}>
        <View style={{height: 60}}></View>
        <Header
          totalMainTime={this.state.totalMainTime}
          totalSubTime={this.state.totalSubTime}
          timeSeperation={this._timeSeperation.bind(this)}
        />
        <Buttons
          btnFuncL={this.state.btnFuncL.bind(this)}
          btnFuncR={this.state.btnFuncR.bind(this)}
          btnNameL={this.state.btnNameL}
          btnNameR={this.state.btnNameR}
        />
        <ListView
          dataSource={theDataSource}
          renderRow={this._renderRow}
          initialListSize={4}
        />
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <View style={day1Style.timeline}>
        <Text>{rowData.title + " >> " + rowData.record}</Text>
      </View>
    )
  }

  _startTime(){
    if (!this.state.timerOn){
      let timer = setInterval(() => {
        let mainTime = this.state.mainTime
        let subTime = this.state.subTime
        let totalMainTime = this._timeSeperation(mainTime)
        let totalSubTime = this._timeSeperation(subTime)

        this.setState({
          totalMainTime: totalMainTime,
          totalSubTime: totalSubTime,
          mainTime: mainTime + 1,
          subTime: subTime + 1,
        })
      }, 10)

      this.setState({
        timer: timer,
        timerOn: true,
        btnNameL: 'Register',
        btnNameR: 'Stop',
        btnFuncL: this._registerTime,
        btnFuncR: this._stopTime,
      })
    }
  }

  _stopTime() {
    if (this.state.timerOn) {
      clearInterval(this.state.timer)

      this.setState({
        timerOn: false,
        btnNameL: 'Start',
        btnNameR: 'Reset',
        btnFuncL: this._startTime,
        btnFuncR: this._clearTime,
      })
    }
  }

  _registerTime() {
    let rowData = this.state.rowData
    let recordCounter = this.state.recordCounter
    let totalMainTime = this.state.totalMainTime

    rowData.unshift({
      title: 'Number ' + this.state.recordCounter,
      record: totalMainTime,
    })

    this.setState({
      rowData: rowData,
      recordCounter: ++recordCounter,
      subTime: 0,
    })
  }

  _clearTime() {
    this.setState({
      mainTime: 0,
      subTime: 0,
      totalMainTime: '00 : 00 : 00',
      totalSubTime: '00 : 00 : 00',
      btnNameL: 'Start',
      btnNameR: 'Stop',
      btnFuncL: this._startTime,
      btnFuncR: this._stopTime,
      rowData: [
        {title: '', record: ''},
        {title: '', record: ''},
        {title: '', record: ''},
        {title: '', record: ''}
      ],
      recordCounter: 1,
    })
  }

  _timeSeperation(time) {
    if (time >= 360000) {
      var hours = Math.floor(time / 360000)
      time -= hours * 360000

      var minutes = Math.floor(time / 6000)
      time -= minutes * 6000

      var seconds = Math.floor(time / 100)

      return(`${hours} : ${minutes<10 ? '0'+minutes : minutes} : ${seconds<10 ? '0'+seconds : seconds}`)
    } else {
      var minutes = Math.floor(time / 6000)
      time -= minutes * 6000

      var seconds = Math.floor(time / 100)
      var miliseconds = time - seconds * 100

      return(`${minutes<10 ? '0'+minutes : minutes} : ${seconds<10 ? '0'+seconds : seconds} : ${miliseconds<10 ? '0'+miliseconds : miliseconds}`)
    }
  }
}

class Header extends Component {
  render() {
    return (
      <View style={day1Style.header}>
        <Text>
          {this.props.totalSubTime}
        </Text>
        <Text>
          {this.props.totalMainTime}
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
          onPress={this.props.btnFuncL}>
          <Text>
            {this.props.btnNameL}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={day1Style.button}
          onPress={this.props.btnFuncR}>
          <Text>
            {this.props.btnNameR}
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
