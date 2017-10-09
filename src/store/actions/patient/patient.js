'use strict';

import {requestInProgress, requestSuccess, requestFail, setErrorMessage} from '../asyncStatusRequest/asyncStatusRequest';
import axios from 'axios';

export const SET_PATIENT_VISIBILITY = 'SET_PATIENT_VISIBILITY';
export const SET_PATIENT_ID = 'SET_PATIENT_ID';

//@todo add pure function tests
export const patientAsyncActions = {
	inProgress : 'PATIENT_REQUEST_IN_PROGRESS',
	success: 'PATIENT_REQUEST_SUCCESS',
	fail: 'PATIENT_REQUEST_FAIL' 
} ;

//@todo add pure function tests
export const setPatientVisibility = (isVisisble) => ({
	type: SET_PATIENT_VISIBILITY,
	isVisisble: isVisisble
});

//@todo add pure function tests
export const setPatientId = (id) => ({
	type: SET_PATIENT_ID,
	id: id
});

/**
 * Ajax request to fetch patient
 * When triggered,requestInProgress action is dispatched
 * On success, requestSuccess action is dispatched
 * On Error, requestFail action is dispatched
 *
 * @param  {String}  uri of the request
 * @param  {Object}  actionAsyncTypeModel 
 * @param  {String}  redux store attribute name for storing the resolved data
 * @return {Promise}  
 */
export const getPatient = (url = '') =>   
	(dispatch, getState) => {
		dispatch(requestInProgress(patientAsyncActions.inProgress));

		return axios.get(url)
	  		.then(response => { 
				dispatch(requestSuccess(patientAsyncActions.success, response.data));
	  		})
	  		.catch(ex => {
	  			dispatch(requestFail(patientAsyncActions.fail, setErrorMessage(ex)));
	  		});
	};
	