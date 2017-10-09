import axios from 'axios';

import { 
	requestSuccess,
	requestFail,
	requestInProgress,
	errorMessages,
	setErrorMessage 
} from './asyncStatusRequest';
  
describe('asyncStatusRequest Action', () => { 	
    describe('requestSuccess', () => {

	   	it('should be pure function', () => {	
	  		expect(requestSuccess('actionName', 'data')).toEqual({type: 'actionName', data: 'data'});
		});
  	});
    describe('requestFail', () => {

	   	it('should be pure function', () => {	
	  		expect(requestFail('actionName', 'data')).toEqual({type: 'actionName', status: 'data'});
		});
  	});
  	describe('requestInProgress', () => {

	   	it('should be pure function', () => {	
	  		expect(requestInProgress('actionName')).toEqual({type: 'actionName'});
		});
  	});
});

describe('setErrorMessage', () => { 
	it('should be pure function', () => {	

		describe('Registered Error', () => { 
			it('should return registered Error Messages', () => {
			  	for (let errorCode in errorMessages) { 
			  		expect(setErrorMessage({request: {status: errorCode}})).toEqual(errorMessages[errorCode]);
			  	}
		  	});
	  	});

	  	describe('Unregistered Error with status', () => { 
	  		it('should return status', () => {
			  	for (let errorCode in errorMessages) { 
			  		expect(setErrorMessage({request: {status: 44444}})).toEqual('44444 Error Occurred with status.');
			  	}
		  	});
	  	});

	  	describe('Unregistered Error with no status', () => { 
	  		it('should return error message', () => {
			  	for (let errorCode in errorMessages) { 
			  		expect(setErrorMessage()).toEqual('Error Occurred');
			  	}
		  	});
	  	});
	});
});
