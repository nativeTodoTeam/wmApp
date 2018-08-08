import { combineReducers } from 'redux';
import assign from 'lodash.assign';
import {
  GET_LOCAL_WEATHER
} from '../actionTypes/index.js';

const weather = (state = {
  weather: {
    city: '',
    temperature: ''
  }
}, action) => {
  switch (action.type) {
    case GET_LOCAL_WEATHER:
      return assign({}, state, action.info);
    default:
      return state;
  }
}

export default combineReducers({
  weather,
});
