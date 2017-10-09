import axios from 'axios';

import { configAsyncActions } from '../../actions/config/config';
import { config } from './config';
import { actionAsyncModel, reducerModel } from '../../actions/asyncStatusRequest/asyncStatusRequest' 
  

describe('config Reducer', () => {
    describe('Action type is not supported ', () => {

    	it('should return the default state', () => {
    		expect(config()).toEqual(reducerModel);
    	});
    });

    describe('Action type is configAsyncActions.fail', () => {

    	it('should return state with error.status attribute set to true', () => {
    		expect(config(reducerModel, { type: configAsyncActions.fail}).error.status).toEqual(true);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(config(reducerModel, { type: configAsyncActions.fail}).isFetching).toEqual(false);
    	});
    }); 

    describe('Action type is configAsyncActions.inProgress', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(config(reducerModel, { type: configAsyncActions.inProgress}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to true', () => {
    		expect(config(reducerModel, { type: configAsyncActions.inProgress}).isFetching).toEqual(true);
    	});  	
    });

    describe('Action type is configAsyncActions.success', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(config(reducerModel, { type: configAsyncActions.success}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(config(reducerModel, { type: configAsyncActions.success}).isFetching).toEqual(false);
    	});  
    	it('should return new state', () => { 

    		expect(config({}, { type: configAsyncActions.success, data: ['data']}).data).toEqual(['data']);
    	}); 	
    });
});