import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import styles from './../style/style';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class InitPage extends Component {
  componentWillMount() {
    this.setState({
      themes: [
        {
          day: "Day1",
          title: "StopWatch",
          iconName: "ios-stopwatch",
          pageKey: "Day1",
          color: "#ff856c",
        },
        {
          day: "Day2",
          title: "WeatherApp",
          iconName: "ios-partly-sunny",
          pageKey: "PageTwo",
          color: "#90bdc1",
        },
        {
          day: "Day3",
          title: "TwitterAppEntrance",
          iconName: "logo-twitter",
          pageKey: "Prac",
          color: "#2aa2ef"
        }
      ]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{height: 60}}></View>
          <Header />
          <ContentRow contentData={ this.state.themes }/>
        </ScrollView>
      </View>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <View style={initStyle.header}>
        <Image
          source={require('../image/initCarousel.jpg')}
          style={{width: 380, height:130, opacity: 0.6,}}>
        </Image>
      </View>
    );
  }
}

class ContentRow extends Component {
  render() {
    return(
      <View style={initStyle.contentRow}>
        {
            this.props.contentData.map((contentData,index)=>{
              return (
                <Button
                  key={contentData.day}
                  name={contentData.day}
                  iconName={contentData.iconName}
                  pageKey={contentData.pageKey}
                  iconColor={contentData.color}
                />
              )
            })
        }
        <Button key="test" name="Day1" iconName="ios-beer" pageKey="Prac"/>
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
      </View>
    )
  }
}

class Button extends Component {
  render(){
    let pageKey = this.props.pageKey
    let iconName = this.props.iconName
    let iconColor = this.props.iconColor

    return(
      <View>
        <TouchableOpacity style={initStyle.button} onPress={() => Actions[pageKey]()} >
          <Ionicons name={ iconName } size={50} color={ iconColor } />
          <Text style={ initStyle.buttonText }>
            {
              this.props.name ? this.props.name : "hello world!"
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


initStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444B54',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    borderColor: '#ccc'
  },
  contentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: 124.8,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f3f3f3'
  },
  buttonText: {
    alignSelf: 'center'
  }
})
