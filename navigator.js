import React, { Component } from 'react';

import { Router, Scene, } from 'react-native-router-flux';

import InitPage from './component/InitPage';
import Day1 from './component/Day1';
import PageTwo from './component/PageTwo';

import Prac from './Prac'

export default class App extends Component {
  render (){
    return (
      <Router>
        <Scene key="root">
          <Scene key="InitPage" component={InitPage} title="30Days of RN" initial={true}/>
          <Scene key="Day1" component={Day1} title="Stopwatch" />
          <Scene key="PageTwo" component={PageTwo} title="PageTwo" />


          <Scene key="Prac" component={Prac} title="Prac area" />
        </Scene>
      </Router>
    );
  }
}
