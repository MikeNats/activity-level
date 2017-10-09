/* global document */
'use strict';

import '../scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, HashRouter,} from 'react-router-dom';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import  createBrowserHistory  from 'history/createBrowserHistory';
import store from './store/store';

import App from './containers/app/app';

/**
 * @description Bootstrapping the of App
 * App connected with react-redux & react-router 
 */
ReactDOM.render(	
	<Provider store={store}>
		<Router history={syncHistoryWithStore(createBrowserHistory(), store)}> 
			<section>
				  <HashRouter>
					<section> 
						  	<Route exact path='/' component={App} />
					</section>	
				  </HashRouter>
			</section>	
		</Router> 
	</Provider>, 
	document.getElementById('react-container')	
);