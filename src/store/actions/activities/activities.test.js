'use strict';

import axios from 'axios';

import { 
	getActivities,
	activitiesAsyncActions
} from './activities';
  

describe('getActivities async Action', () => { 

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
			await getActivities(url)(dispatch, getState);
			
			expect(dispatch.mock.calls[0][0].type).toEqual(activitiesAsyncActions.inProgress);
		});
    });

    describe('On Success', () => {
    	let mockData = { 
	      		data: { 
	      			mock: "data"
	      		}
	        };

    	beforeEach(function () {
	      	axios.get = jest.fn((url) => Promise.resolve(mockData)); 
	     });

    	it('should dispatch action `requestSuccess` with given data', async () => {
			await getActivities(url)(dispatch, getState);
			
        	expect(dispatch.mock.calls[1][0].type).toEqual(activitiesAsyncActions.success);
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
			await getActivities(url)(dispatch, getState);
			
        	expect(dispatch.mock.calls[1][0].type).toEqual(activitiesAsyncActions.fail);
		}); 
    });
});
