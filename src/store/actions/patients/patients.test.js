'use strict';

import axios from 'axios';
import { setInitialVisibleSearchResults, SET_INITIAL_VISIBLE_SEARCH_RESULTS } from '../visibleSearchResults/visibleSearchResults';

import { 
	getPatients,
	patientsAsyncActions
} from './patients';
  

describe('patientsAsyncActions async Action', () => { 

	const url = 'https://endpoint.local',
	dispatch = jest.fn(),
   	getState = jest.fn(() => ({url: url}));


   	afterEach(()=> {
   		dispatch.mockReset();
   	});

    describe('On invocation', () => {
    	beforeEach(function () {
	      axios.get = jest.fn((url) => Promise.resolve({}));
	    }); 

    	it('should dispatch action`requestInProgress`', async () => {
			await getPatients(url)(dispatch, getState);
			
			expect(dispatch.mock.calls[0][0].type).toEqual(patientsAsyncActions.inProgress);

		});
    });

    describe('On Success', () => {
    	let mockData = {data: [{birthDate: '1985-05-26'}]};

    	beforeEach(function () {
	      	axios.get = jest.fn((url) => Promise.resolve(mockData)); 
	     });

    	it('should dispatch action `requestSuccess` for `patientsAsyncActions` with given data by formating dates', async () => {
			await getPatients(url)(dispatch, getState);
			
        	expect(dispatch.mock.calls[1][0].type).toEqual(patientsAsyncActions.success);
  			expect(typeof dispatch.mock.calls[1][0].data[0].birthDate.getTime).toEqual('function');
		});

		it('should dispatch action `requestSuccess` for  `visibleResults` with given data by formating dates', async () => {
			await getPatients(url)(dispatch, getState);
			
        	expect(dispatch.mock.calls[2][0].type).toEqual(SET_INITIAL_VISIBLE_SEARCH_RESULTS);
  			expect(typeof dispatch.mock.calls[2][0].dataToSearch[0].birthDate.getTime).toEqual('function');
		});
    });

    describe('On Fail', () => {
    	beforeEach(function () {
	      	axios.get = jest.fn((url) => Promise.reject({request: {
	      			status: 500
	      		}
	      	})); 
	     }); 

    	it('should dispatch action `requestFail` with the relevant status message', async () => {
			await getPatients(url)(dispatch, getState);
			
        	expect(dispatch.mock.calls[1][0].type).toEqual(patientsAsyncActions.fail);
		}); 
    });
});
