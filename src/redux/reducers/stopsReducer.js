import {ActionConstants, StringConstants} from '../../constants/constants'
import {cloneDeep} from 'lodash';

const initialState = {
    stops:[]
}
export function stopsReducer(state = initialState, action) {
    switch(action.type){
        case ActionConstants.ADD_STOPS_TO_STORE:
            let newState = cloneDeep(state);
            newState.stops = (action[StringConstants.STOPS_DATA])
            return newState;
        case ActionConstants.DONATE_TO_STOP:
             let updatedState = cloneDeep(state);
             updatedState.stops = (action[StringConstants.STOPS_DATA]);
             return updatedState;
        default:
            return state; 
    }
}
