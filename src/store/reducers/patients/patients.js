'use strict';

import {patientsAsyncActions} from '../../actions/patients/patients';
import {actionAsyncModel, reducerModel} from '../../actions/asyncStatusRequest/asyncStatusRequest'; 

/**
 * @description Reducer manipulate patients data
 * @param  {Object}
 * @param  {Object}
 * @return {Object}
 */ 
export const patients = (state = reducerModel, action = actionAsyncModel, actions) => {
	switch (action.type) { //request failed
	case patientsAsyncActions.fail:
		return {
			...state,
			isFetching: false,
			error: {
				status: true,
				message: action.errorMessage
			  }
		};
	case patientsAsyncActions.inProgress: //request in progress
		return {
			...state,
			isFetching: true,
			error: {
				status: false,
				message: ''
			}
		};
	case patientsAsyncActions.success: //request success
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
