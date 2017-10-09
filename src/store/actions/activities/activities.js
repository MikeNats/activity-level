'use strict';

import {requestInProgress, requestSuccess, requestFail, setErrorMessage} from '../asyncStatusRequest/asyncStatusRequest';
import axios from 'axios';

/**
 * Different status states of the async action getActivities
 */
export const activitiesAsyncActions = {
	inProgress : 'ACTIVITIES_REQUEST_IN_PROGRESS',
	success: 'ACTIVITIES_REQUEST_SUCCESS',
	fail: 'ACTIVITIES_REQUEST_FAIL'
};

/**
 * Ajax request to fetch activities
 * When triggered,requestInProgress action is dispatched
 * On success, requestSuccess action is dispatched
 * On Error, requestFail action is dispatched
 *
 * @param  {String}  uri of the request 
 * @param  {String}  redux store attribute name for storing the resolved data 
 */
export const getActivities = (url = '') => 
	(dispatch, getState) => {
		dispatch(requestInProgress(activitiesAsyncActions.inProgress));
		
		return axios.get(url)
	  		.then(response => { 
	  			dispatch(requestSuccess(activitiesAsyncActions.success, response.data));
	  		})
	  		.catch(ex => { 
	  			dispatch(requestFail(activitiesAsyncActions.fail, setErrorMessage(ex)));
	  		});
	};
    