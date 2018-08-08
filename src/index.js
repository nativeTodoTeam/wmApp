import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import HomeContainer from './containers/homeContainer';

import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const middleware = [logger, thunk];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

export default class App extends Component<Props> {

  render() {
    return (
      <Provider store = { store }>
        <HomeContainer />
      </Provider>
    );
  }
}
