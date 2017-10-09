'use strict';

import {activitiesAsyncActions} from '../../actions/activities/activities';
import {actionAsyncModel, reducerModel} from '../../actions/asyncStatusRequest/asyncStatusRequest';

/**
 * @description Reducer manipulate activities data
 * @param  {Object}
 * @param  {Object}
 * @return {Object}
 */ 
export const activities = (state = reducerModel, action = actionAsyncModel) => {
	switch (action.type) { //request failed
	case activitiesAsyncActions.fail:
		return {
			...state,
			isFetching: false,
			error: {
				status: true,
				message: action.errorMessage
			  }
		};
	case activitiesAsyncActions.inProgress: //request in progress
		return {
			...state,
			isFetching: true,
			error: {
				status: false,
				message: ''
			}
		};
	case activitiesAsyncActions.success: //request success
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
