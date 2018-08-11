import { combineReducers } from 'redux';

import home from './home';
export default combineReducers({
  home
});

export function getWeatherState(state){
  return state.home.weather;
}
