import React, { PropTypes } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';

import Card from '../card/Card';

import WeatherWeek from './WeatherWeek';
import {
	doPRM,
	getMaxCardWidth,
	getCampusPrimary
} from '../../util/general';

import AppSettings from '../../AppSettings';

/**
 * Presentational Component for WeatherCard
 * @param  {Object} weatherData Weather data
 * @param {Object} weatherData.currently Weather data for today
 * @param {Number} weatherData.currently.temperature Current temperature
 * @param {String} weatherData.currently.summary short descriptor for weather conditions
 * @param {String} weatherData.currently.icon Part of icon filename
 * @param {Object[]} weatherData.daily Weather data for next 5 days
 * @param {String} weatherData.daily[].dayofweek 3-letter representation for day of the week
 * @param {String} weatherData.daily[].icon Part of icon filename
 * @param {Number} weatherData.daily[].tempMax Max temperature for day
 * @param {Number} weatherData.daily[].tempMin Min temperature for day
 * @param {Function} gotoSurfReport Navigates to SurfReport
 * @return {JSX} Presentational Component for WeatherCard
 *
 * @todo Provide icon default using non-image urls?
 * @todo Get rid of PRM
 */
const WeatherCard = ({ weatherData, gotoSurfReport }) => (
	<Card id="weather" title="Weather">
		{weatherData ? (
			<View>
				<View style={styles.wc_toprow}>
					<View style={styles.wc_toprow_left}>
						<Text style={styles.wc_current_temp}>
							{ weatherData.currently.temperature }&deg; in San Diego
						</Text>
						<Text style={styles.wc_current_summary}>
							{ weatherData.currently.summary }
						</Text>
					</View>
					<View style={styles.wc_toprow_right}>
						<Image
							style={styles.wc_toprow_icon}
							source={{ uri: AppSettings.WEATHER_ICON_BASE_URL + weatherData.currently.icon + '.png' }}
						/>
					</View>
				</View>

				<WeatherWeek weatherData={weatherData.daily} />

				<TouchableHighlight underlayColor={'rgba(200,200,200,.1)'} onPress={() => gotoSurfReport()}>
					<View style={styles.wc_border}>
						<Text style={styles.wc_surfreport_more}>Surf Report &raquo;</Text>
					</View>
				</TouchableHighlight>
			</View>
		) : (
			<View style={[styles.cardcenter, styles.wc_loading_height]}>
				<ActivityIndicator size="large" />
			</View>
		)}
	</Card>
);

WeatherCard.propTypes = {
	weatherData: PropTypes.object,
	gotoSurfReport: PropTypes.func
};

const styles = StyleSheet.create({
	wc_toprow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#EEE', justifyContent: 'center', alignItems: 'center', width: getMaxCardWidth(), paddingHorizontal: 14 },
	wc_toprow_left: { flex: 4 },
	wc_current_temp: { fontSize: doPRM(22), fontWeight: '300' },
	wc_current_summary: { fontSize: doPRM(15), color: '#444', paddingTop: 10, fontWeight: '300' },
	wc_toprow_right: { flex: 1 },
	wc_toprow_icon: { width: doPRM(68), height: doPRM(68) },
	wc_border: { borderTopWidth: 1, borderTopColor: '#CCC', width: getMaxCardWidth() },
	wc_surfreport_more: { fontSize: doPRM(20), fontWeight: '300', color: getCampusPrimary(), paddingHorizontal: 14, paddingVertical: 10 },
	cardcenter: { alignItems: 'center', justifyContent: 'center', width: getMaxCardWidth() },
	wc_loading_height: { height: doPRM(270) },
});

export default WeatherCard;
