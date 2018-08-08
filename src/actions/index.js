import {
  GET_LOCAL_WEATHER
} from '../actionTypes/index.js';
import Config from '../common/config/config.js';

function getWeatherAction(info) {
  return {
    type: GET_LOCAL_WEATHER,
    info: info,
  }
}

export function getWeather() {
  return dispatch => {
    let data = { weather: { city: '北京', temperature: '30℃' } };

    fetch(`${ Config.host }/userInfo?userId=1`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

    dispatch(getWeatherAction(data))
  }
}
