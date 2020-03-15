import {stopsReducer} from './reducers/stopsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ 
  "stopsData": stopsReducer
});

export default rootReducer;