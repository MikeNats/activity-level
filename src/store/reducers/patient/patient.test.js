'use strict';

import { patientAsyncActions, SET_PATIENT_VISIBILITY, SET_PATIENT_ID } from '../../actions/patient/patient';

import { patient, reducerModel } from './patient';
import { actionAsyncModel  } from '../../actions/asyncStatusRequest/asyncStatusRequest' 
  

describe('patient Reducer', () => {
    describe('Action type is not supported ', () => {

    	it('should return the default state', () => {
    		expect(patient()).toEqual(reducerModel);
    	}); 
    });  

    describe('Action type is patientAsyncActions.fail', () => {

    	it('should return state with error.status attribute set to true', () => {
    		expect(patient(reducerModel, { type: patientAsyncActions.fail}).error.status).toEqual(true);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(patient(reducerModel, { type: patientAsyncActions.fail}).isFetching).toEqual(false);
    	});
    });

    describe('Action type is patientAsyncActions.inProgress', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(patient(reducerModel, { type: patientAsyncActions.inProgress}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to true', () => {
    		expect(patient(reducerModel, { type: patientAsyncActions.inProgress}).isFetching).toEqual(true);
    	});  	
    });

    describe('Action type is patientAsyncActions.success', () => {

    	it('should return state with error.status attribute set to false', () => {
    		expect(patient(reducerModel, { type: patientAsyncActions.success}).error.status).toEqual(false);
    	});
    	it('should return state with isFetching attribute set to false', () => {
    		expect(patient(reducerModel, { type: patientAsyncActions.success}).isFetching).toEqual(false);
    	});  
    	it('should return new state', () => { 

    		expect(patient({}, { type: patientAsyncActions.success, data: ['data']}).data).toEqual(['data']);
    	}); 	
    });
    describe('Action type is SET_PATIENT_VISIBILITY', () => {

        it('should return state with isVisible attribute set to given value', () => {
            expect(patient(reducerModel, { type: SET_PATIENT_VISIBILITY, isVisible: true}).isVisible).toEqual(true);
        });
    });
    describe('Action type is SET_PATIENT_ID', () => {

        it('should return state with id attribute set to given value', () => {
            expect(patient(reducerModel, { type: SET_PATIENT_ID, id: 10}).id).toEqual(10);
        });
    });
});