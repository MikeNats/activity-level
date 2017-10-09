'use strict';

export const errorMessages = { //http://www.restapitutorial.com/httpstatuscodes.html 
	400: '400 Bad Request. The request could not be understood by the server due to malformed syntax.',
	401: 'Unauthorized. The request requires user authentication.',
	403: 'Forbidden. The server understood the request, but is refusing to fulfill it.',
	404: 'Not Found. The server has not found anything matching the Request-URI.',
	409: 'Conflict. The request could not be completed due to a conflict with the current state of the resource.',
	500: 'Internal Server Error. The server encountered an unexpected condition which prevented it from fulfilling the request.'	 
};

/**
 * @description Returns relevant message base on the given status.
 * @param  {Exeption} 
 * @return {String}
 */
export const setErrorMessage = ex => {
	let status = ((ex || {}).request || {}).status,
		unknownError = (ex, status) => 
			status ? `${status} Error Occurred with status.` : 'Error Occurred.';

	return errorMessages[status] ? errorMessages[status] : unknownError(ex, status);
};

/**
 *  @description Data model for the different status of async Actions
 */
export const actionAsyncModel = {
	inProgress: '',
	success: '',
	fail: ''
};

/**
 * @description Returns relevant message base on the given status.
 */
export const reducerModel = {
	isFetching: false,
	error: {
		status: false,
		message: ''
	},
	data: []
};

/**
 *  @description Request is in Progress Action
 *  @return {Object}
 */
export const requestSuccess = (actionType, response) => ({
	type: actionType,
	data: response
});

/**
 *  @description Request Fail Action
 *  @return {Object}
 */
export const requestFail = (actionType, status = '') => ({
	type: actionType,
	status: status 
});

/**
 *  @description Request Success Action
 *  @return {Object}
 */
export const requestInProgress = (actionType) => ({
	type: actionType	
});
