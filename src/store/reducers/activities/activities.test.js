import axios from 'axios';

import { activitiesAsyncActions } from '../../actions/activities/activities';
import { activities } from './activities';
import { actionAsyncModel, reducerModel } from '../../actions/asyncStatusRequest/asyncStatusRequest' 
  

describe('activities Reducer', () => {
    describe('Action type is not supported ', () => {

    	it('should return the default state', () => {
    		expect(activities()).toEqual(reducerModel);
    	});
    });

    describe('Action type is activitiesAsyncActions.fail', () => {

    	it('should return state with error.status attribute set to true', () => {
    		expect(activities(reducerModel, { type: activitiesAsyncActions.fail}).error.status).toEqual(true);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(activities(reducerModel, { type: activitiesAsyncActions.fail}).isFetching).toEqual(false);
    	});
    });
 
    describe('Action type is activitiesAsyncActions.inProgress', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(activities(reducerModel, { type: activitiesAsyncActions.inProgress}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to true', () => {
    		expect(activities(reducerModel, { type: activitiesAsyncActions.inProgress}).isFetching).toEqual(true);
    	});  	
    });

    describe('Action type is activitiesAsyncActions.success', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(activities(reducerModel, { type: activitiesAsyncActions.success}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(activities(reducerModel, { type: activitiesAsyncActions.success}).isFetching).toEqual(false);
    	});  
    	it('should return new state', () => { 

    		expect(activities({}, { type: activitiesAsyncActions.success, data: ['data']}).data).toEqual(['data']);
    	}); 	
    });
});