'use strict';
import axios from 'axios';

import {requestInProgress, requestSuccess, requestFail, setErrorMessage} from '../asyncStatusRequest/asyncStatusRequest';

export const configAsyncActions = {
	inProgress : 'CONFIG_REQUEST_IN_PROGRESS',
	success: 'CONFIG_REQUEST_SUCCESS',
	fail: 'CONFIG_REQUEST_FAIL'
}; 

/**
 * Ajax request to fetch app config
 * When triggered,requestInProgress action is dispatched
 * On success, requestSuccess action is dispatched
 * On Error, requestFail action is dispatched
 *
 * @param  {String}  uri of the request
 * @param  {Object}  actionAsyncTypeModel 
 * @param  {String}  redux store attribute name for storing the resolved data
 * @return {Promise}  
 */
export const getConfig = (url = '') =>   
	(dispatch, getState) => {
		dispatch(requestInProgress(configAsyncActions.inProgress));
		
		return axios.get(url)
	  		.then(response => { 
				dispatch(requestSuccess(configAsyncActions.success, response.data));
	  		})
	  		.catch(ex => {
	  			dispatch(requestFail(configAsyncActions.fail, setErrorMessage(ex)));
	  		});
	};