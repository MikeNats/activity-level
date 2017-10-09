'use strict';

import {setInitialVisibleSearchResults} from '../visibleSearchResults/visibleSearchResults';
import {requestInProgress, requestSuccess, requestFail, setErrorMessage} from '../asyncStatusRequest/asyncStatusRequest';
import axios from 'axios';
import {ageSpectrum} from '../../reducers/visibleSearchResults/searchLib';
export const patientsAsyncActions = {
	inProgress : 'PATIENTS_REQUEST_IN_PROGRESS',
	success: 'PATIENTS_REQUEST_SUCCESS',
	fail: 'PATIENTS_REQUEST_FAIL'
}; 

const format = (data = []) => 
	data.map((item) => {
		if(item.birthDate) {
			item.birthDate = new Date(item.birthDate);
		}
			
		return item; 
	});

/**
 * Ajax request to fetch Patients 
 * When triggered,requestInProgress action is dispatched
 * On success, requestSuccess action is dispatched
 * On Error, requestFail action is dispatched
 */
export const getPatients = (url = '') => 
	(dispatch, getState) => {
		dispatch(requestInProgress(patientsAsyncActions.inProgress));
		
		return axios.get(url)
	  		.then(response => { 
	  			let data = ageSpectrum(format(response.data));

				dispatch(requestSuccess(patientsAsyncActions.success, data));
				dispatch(setInitialVisibleSearchResults(data)); 
	  		})
	  		.catch(ex => {
	  			dispatch(requestFail(patientsAsyncActions.fail, setErrorMessage(ex)));
	  		});
	};
	