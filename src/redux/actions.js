import {StringConstants, ActionConstants} from '../constants/constants';
import update from 'immutability-helper';

/**
 * Action creater for ADD_STOPS_TO_STORE.
 * @param {*} action 
 */
export const saveStopsDataToStore = (data) => 
                { return update(data, {$merge: { type:  ActionConstants.ADD_STOPS_TO_STORE }})};

/**
 * Action creater for DONATE_TO_STOP.
 * @param {*} action 
 */
export const donateToStop = (data) => 
                { return update(data, {$merge: { type:  ActionConstants.DONATE_TO_STOP }})};                