'use strict';

import {patientAsyncActions, SET_PATIENT_VISIBILITY, SET_PATIENT_ID} from '../../actions/patient/patient';
import {actionAsyncModel} from '../../actions/asyncStatusRequest/asyncStatusRequest';

export const reducerModel = {
	id: null,
	isVisible: false,
	isFetching: false,
  	error: {
		status: false,
		message: ''
  	},
  	data: []
};
/**
 * @description Reducer manipulate patients data
 * @param  {Object}
 * @param  {Object}
 * @return {Object}
 */ 
export const patient = (state = reducerModel, action = actionAsyncModel, actions) => {
	switch (action.type) { //request failed
	case patientAsyncActions.fail:
		return {
			...state,
			id: null,
			isVisible: false,
			isFetching: false,
			error: {
				status: true,
				message: action.errorMessage
			  }
		};
	case patientAsyncActions.inProgress: //request in progress
		return {
			...state,
			isVisible: false,
			isFetching: true,
			error: {
				status: false,
				message: ''
			}
		};
	case patientAsyncActions.success: //request success
		return {
			...state,
			isVisible: true,
			data: [].concat([], action.data),
			isFetching: false,
			error: {
				status: false,
				message: ''
			}
		};
	case SET_PATIENT_VISIBILITY:
		return {
			...state,
			isVisible: action.isVisible,
			data: [],
			isFetching: false,
			error: {
				status: false,
				message: ''
			}
		};
	case SET_PATIENT_ID:
		return {
			...state,
			id: action.id,
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
