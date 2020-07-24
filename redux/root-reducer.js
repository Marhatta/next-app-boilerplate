import {combineReducers} from 'redux';
import appReducer from './app/app.reducers';

const reducers = combineReducers({
  app: appReducer,
});

export default reducers;