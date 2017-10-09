'use strict';

import {configAsyncActions} from '../../actions/config/config';
import {actionAsyncModel, reducerModel} from '../../actions/asyncStatusRequest/asyncStatusRequest'; 

/**
 * @description Reducer manipulate config data
 * @param  {Object}
 * @param  {Object}
 * @return {Object}
 */ 
export const config = (state = reducerModel, action = actionAsyncModel, actions) => {
	switch (action.type) { //request failed
	case configAsyncActions.fail:
		return {
			...state,
			isFetching: false,
			error: {
				status: true,
				message: action.errorMessage
			  }
		};
	case configAsyncActions.inProgress: //request in progress
		return {
			...state,
			isFetching: true,
			error: {
				status: false,
				message: ''
			}
		};
	case configAsyncActions.success: //request success
		return {
			data: [].concat([], action.data),
			isFetching: false,
			error: {
				status: false,
				message: ''
			}
		};
	default:
		return state;
	}
};