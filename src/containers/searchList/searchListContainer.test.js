import React from 'react';

import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import SearchListContainer from './searchListContainer';
jest.mock('../../store/actions/patients/patients');
import { getPatients } from '../../store/actions/patients/patients';
jest.mock('../../store/actions/activities/activities');
import { getActivities} from '../../store/actions/activities/activities';
import config from '../../config';
import axios from 'axios';
  

const initialState = { 
	visibleProducts: [],
	patients: {
		isFetching: false,
	    error: { status: 200, message: '' },
	    data: [] 
	},
	activities: {
		isFetching: false,
	    error: { status: 200, message: '' },
	    data: [] 
	},
	config: {
		api: {
			ACTIVITIES_PATH: '...',
			PATIENTS_PATH: '...'
		}
	},
	visibleResults: [],
	dispatch: function(){}
}


const middlewares = [thunk], 
 	mockStore = configureStore(middlewares),
 	store = mockStore(initialState);

describe('(Container) SearchListContainer', () => {
	let component;

	store.dispatch =  jest.fn();

	afterEach(()=> {
   		store.dispatch.mockReset();
   	});

	it('renders correctly (Snapshot)', () => {	
		component = shallow(<SearchListContainer store={store} />);
  		expect(component).toMatchSnapshot();
	});  
 
	it('should connect `dataToSearch` to props', () => {	
		component = shallow(<SearchListContainer store={store} />);

  		expect(component.props()).toHaveProperty("patients");
  		expect(component.props().patients).toEqual(initialState.patients)
  	});

  	it('should connect `visibleResults` to props', () => {	
		component = shallow(<SearchListContainer store={store} />);

  		expect(component.props()).toHaveProperty("visibleSearchResults");
  		expect(component.props().visibleSearchResults).toEqual(initialState.visibleSearchResults)
  	});

    it('should connect `activities` to props', () => {	
		component = shallow(<SearchListContainer store={store} />);

  		expect(component.props()).toHaveProperty("activities");
  		expect(component.props().activities).toEqual(initialState.activities)
  	});

    it('should connect `config` to props', () => {	
		component = shallow(<SearchListContainer store={store} />);

  		expect(component.props()).toHaveProperty("config");
  		expect(component.props().config).toEqual(initialState.config)
  	});

	it('should triger async action `getActivities`', () => {	
  		component = mount(<SearchListContainer store={ store } />);
	
        expect(getActivities).toHaveBeenCalled(); 
  	});  

  	it('should triger async action `getPatients`', () => {	
  		component = mount(<SearchListContainer store={ store } />);
	
        expect(getPatients).toHaveBeenCalled();
  	});
});
