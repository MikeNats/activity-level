'use strict';

import axios from 'axios';
import { setInitialVisibleSearchResults, SET_INITIAL_VISIBLE_SEARCH_RESULTS } from '../visibleSearchResults/visibleSearchResults';

import { 
	getPatient,
	patientAsyncActions
} from './patient';
  

describe('patientsActions async Action', () => { 

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
			await getPatient(url)(dispatch, getState);
			
			expect(dispatch.mock.calls[0][0].type).toEqual(patientAsyncActions.inProgress);

		});
    });

    describe('On Success', () => {
    	let mockData = { data: {
    		"activity": "sleeping",
   		 	"minutes": 540
  		}};

    	beforeEach(function () {
	      	axios.get = jest.fn((url) => Promise.resolve(mockData)); 
	     });

    	it('should dispatch action `requestSuccess` for `patientAsyncActions`', async () => {
			await getPatient(url)(dispatch, getState);
			
        	expect(dispatch.mock.calls[1][0].type).toEqual(patientAsyncActions.success);
  			expect(dispatch.mock.calls[1][0].data).toEqual(mockData.data);
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
			await getPatient(url)(dispatch, getState);
			
        	expect(dispatch.mock.calls[1][0].type).toEqual(patientAsyncActions.fail);
		}); 
    });
});
