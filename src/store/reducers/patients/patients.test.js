import axios from 'axios';

import { patientsAsyncActions } from '../../actions/patients/patients';
import { patients } from './patients';
import { actionAsyncModel, reducerModel } from '../../actions/asyncStatusRequest/asyncStatusRequest' 
  

describe('patients Reducer', () => {
    describe('Action type is not supported ', () => {

    	it('should return the default state', () => {
    		expect(patients()).toEqual(reducerModel);
    	});
    });

    describe('Action type is patientsAsyncActions.fail', () => {

    	it('should return state with error.status attribute set to true', () => {
    		expect(patients(reducerModel, { type: patientsAsyncActions.fail}).error.status).toEqual(true);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(patients(reducerModel, { type: patientsAsyncActions.fail}).isFetching).toEqual(false);
    	});
    }); 

    describe('Action type is patientsAsyncActions.inProgress', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(patients(reducerModel, { type: patientsAsyncActions.inProgress}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to true', () => {
    		expect(patients(reducerModel, { type: patientsAsyncActions.inProgress}).isFetching).toEqual(true);
    	});  	
    });

    describe('Action type is patientsAsyncActions.success', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(patients(reducerModel, { type: patientsAsyncActions.success}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(patients(reducerModel, { type: patientsAsyncActions.success}).isFetching).toEqual(false);
    	});  
    	it('should return new state', () => { 

    		expect(patients({}, { type: patientsAsyncActions.success, data: ['data']}).data).toEqual(['data']);
    	}); 	
    });
});