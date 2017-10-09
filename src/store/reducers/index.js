'use strict';

import {createStore,  applyMiddleware, compose,  combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {patients} from './patients/patients';
import {patient} from './patient/patient';
import {config} from './config/config';
import {activities} from './activities/activities';
import {visibleSearchResults} from './visibleSearchResults/visibleSearchResults';


/**
 * @description combine and export all reducers
 * @export {Reducers}
 */
export const reducers = combineReducers({
	activities: activities,
	visibleSearchResults: visibleSearchResults,
	patients: patients,
	patient: patient,
	routing: routerReducer,
	config: config
});

		