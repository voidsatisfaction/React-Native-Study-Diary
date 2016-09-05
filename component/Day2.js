import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
	ScrollView,
  ListView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Should be scroll View!
export default class WeatherApp extends Component {
	render() {
		return (
			<View style={day2Style.container}>
				<ScrollView style={day2Style.scrollContainer}>
					<View style={{height: 65}}></View>
					<TodayDayView />
					<TodayHourView />
					<WeekWeatherView />
					<TodayDetailView />
				</ScrollView>
				<MenuBar />
			</View>
		)
	}
}

class TodayDayView extends Component {
	render(){
		return(
			<View style={day2Style.todayDayView}>
				<Text style={day2Style.city}>京都</Text>
				<Text style={day2Style.weather}>晴れ</Text>
				<Text style={day2Style.degree}>15C</Text>
			</View>
		)
	}
}

class TodayHourView extends Component {
	render(){
		return(
			<View style={day2Style.todayHourView}>
				<View style={day2Style.hourViewHeader}>
					<View style={day2Style.hourViewHeaderHead}>
						<Text style={day2Style.hourViewHeaderTime}>土曜日 今日</Text>
					</View>
					<View style={day2Style.hourViewHeaderTail}>
						<Text style={day2Style.hourViewHeaderDegree}>17 / 14</Text>
					</View>
				</View>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={day2Style.hourViewContainer}>
					{
						[1,1,1,1,1,1,1,1,1,1].map((ele,index) => {
							return(
								<View style={day2Style.hourViewItem} key={index}>
									<Text style={day2Style.hourViewTime}>現在</Text>
									<Ionicons style={day2Style.hourViewIcon} name='ios-cloudy' size={25} color={'#ff856c'} />
									<Text style={day2Style.hourViewDegree}>15C</Text>
								</View>
							)
						})
					}
				</ScrollView>
			</View>
		)
	}
}

class WeekWeatherView extends Component {
	constructor(props) {
		super(props)
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {dayOfWeek: 'Sunday', weatherIcon: 'ios-sunny', highestDegree: 32, lowestDegree: 24},
				{dayOfWeek: 'Sunday', weatherIcon: 'ios-sunny', highestDegree: 32, lowestDegree: 24},
				{dayOfWeek: 'Sunday', weatherIcon: 'ios-sunny', highestDegree: 32, lowestDegree: 24},
				{dayOfWeek: 'Sunday', weatherIcon: 'ios-sunny', highestDegree: 32, lowestDegree: 24},
				{dayOfWeek: 'Sunday', weatherIcon: 'ios-sunny', highestDegree: 32, lowestDegree: 24},
				{dayOfWeek: 'Sunday', weatherIcon: 'ios-sunny', highestDegree: 32, lowestDegree: 24},
				{dayOfWeek: 'Sunday', weatherIcon: 'ios-sunny', highestDegree: 32, lowestDegree: 24},
      ])
    };
	}

	render(){
		return(
			<ListView
				style={day2Style.weekWeatherView}
				dataSource={this.state.dataSource}
				renderRow={this._renderRow}
			/>
		)
	}

	_renderRow(rowData){
		return(
			<View style={day2Style.weekWeatherItem}>
				<View style={day2Style.weekWeatherDay}>
					<Text>{rowData.dayOfWeek}</Text>
				</View>
				<View style={day2Style.weekWeatherIcon}>
					<Ionicons style={day2Style.hourViewIcon} name={rowData.weatherIcon} size={25} color={'#ff856c'} />
				</View>
				<View style={day2Style.weekWeatherDegree}>
					<Text>{rowData.highestDegree}   {rowData.lowestDegree}</Text>
				</View>
			</View>

		)
	}
}


class TodayDetailView extends Component {
	render(){
		return(
			<View style={day2Style.todayWeatherOutline}>
				<View style={day2Style.todayWeatherExplain}>
					<Text style={day2Style.todayWeatherExplainText}>
						Today is rainy day.
						You should use umbrella until tomorrow morning.
					</Text>
				</View>
				<View style={day2Style.todayWeatherDetail}>
					{ /* Every 2 items => one empty row */ }
					<View style={day2Style.todayWeatherDetailItem}>
						<Text>
							Humidity: 82%
						</Text>
					</View>
					<View style={day2Style.todayWeatherDetailItem}>
						<Text>
							Humidity: 82%
						</Text>
					</View>
					<View style={day2Style.todayWeatherDetailItem}>
						<Text>
							Humidity: 82%
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

class MenuBar extends Component {
	render(){
		return(
			<View style={day2Style.menuBar}>
				<View style={day2Style.menuBarSourcePage}>
					<Ionicons style={day2Style.hourViewIcon} name='ios-time' size={25} color={'#ff856c'} />
				</View>
				<View style={day2Style.menuBarCopyRight}>
					<Text>voidSatisfaction</Text>
				</View>
				<View style={day2Style.menuBarMenu}>
					<Ionicons style={day2Style.hourViewIcon} name='ios-menu' size={25} color={'#ff856c'} />
				</View>
			</View>
		)
	}
}


day2Style = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#ffff',
  },
	//
	scrollContainer: {
		flexDirection: 'column'
	},
	//
	todayDayView: {
		paddingTop: 5,
		height: 180,
		alignItems: 'center',
	},
	city: {
		fontSize: 25,
		paddingBottom: 5,
	},
	weather: {
		fontSize: 15,
	},
	degree: {
		fontSize: 85,
		fontWeight: "100",
	},
	//
	todayHourView: {
		height: 120,
	},
	hourViewHeader: {
		flexDirection: 'row',
	},
	hourViewHeaderHead: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingLeft: 20,
	},
	hourViewHeaderTail: {
		justifyContent: 'flex-end',
		paddingRight: 20,
	},
	hourViewHeaderTime: {
		fontSize: 15,
		fontWeight: '400',
	},
	hourViewHeaderDegree: {
		fontSize: 15,
		fontWeight: '200',
	},
	hourViewContainer: {
		marginTop: 3,
		marginBottom: 3,
		borderTopWidth: 0.5,
		borderBottomWidth: 0.7,
	},
	hourViewItem: {
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f3f3f3'
	},
	hourViewTime: {
		fontSize: 15,
	},
	hourViewIcon: {
		paddingTop: 5,
	},
	hourViewDegree: {
		fontSize: 15,
	},
	//
	weekWeatherView: {
		height: 270,
		paddingTop: 5,
		paddingBottom: 5,
	},
	weekWeatherItem: {
		flex: 1,
		flexDirection: 'row',
		paddingBottom: 5,
	},
	weekWeatherDay: {
		flex: 1,
		paddingLeft: 20,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	weekWeatherIcon: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	weekWeatherDegree: {
		flex: 1,
		paddingRight: 25,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	//
	todayWeatherOutline: {
		backgroundColor: '#f3f3f3',
		flexDirection: 'column',
	},
	todayWeatherExplain: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 20,
		paddingRight: 25
	},
	todayWeatherExplainText: {
		fontSize: 15,
		fontWeight: '300',
	},
	todayWeatherDetail: {
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 20,
		paddingRight: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	todayWeatherDetailItem: {
		paddingBottom: 5,
	},
	todayWeatherDetailText: {
		fontSize: 15,
	},
	//
	menuBar: {
		flexDirection: 'row',
		height: 35,
		borderTopWidth: 0.5,
		backgroundColor: '#ffff',
	},
	menuBarSourcePage: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingLeft: 20,
	},
	menuBarCopyRight: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	menuBarMenu: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingRight: 25,
	}
})
