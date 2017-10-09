/* global process */

'use strict';

import {createStore,  applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import {reducers} from './reducers/index';

const isProduction = (process.env.NODE_ENV === 'production');
const middleware = [ thunk ];

if (!isProduction) {// if not production
	middleware.push(logger); //dev tools Redux logger
}

/**
 * Exports Redux store 
 */
export default createStore(
	reducers,
 	applyMiddleware(...middleware)
);