import React from 'react';

import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import PatientContainer from './patientContainer';
import config from '../../config';
import axios from 'axios';

const initialState = { 
	patients: {
		isFetching: false,
	    error: { status: 200, message: '' },
	    data: [] 
	},
	patient: {
		id: null,
		isVisible: false,
		isFetching: false, 
	    error: { status: 200, message: '' },
	    data: [] 
	},
	dispatch: function(){}
}

const middlewares = [thunk], 
 	mockStore = configureStore(middlewares),
 	store = mockStore(initialState);

describe('(Container) PatientContainer', () => {
	let component;

	store.dispatch =  jest.fn();

	afterEach(()=> {
   		store.dispatch.mockReset();
   	});

	it('renders correctly (Snapshot)', () => {	
		component = shallow(<PatientContainer store={store} />);
  		expect(component).toMatchSnapshot();
	});  
 
	it('should connect `patient` to props', () => {	
		component = shallow(<PatientContainer store={store} />);

  		expect(component.props()).toHaveProperty("patient");
  		expect(component.props().patient).toEqual(initialState.patient);
  	});

  	it('should connect `patients` to props', () => {	
		component = shallow(<PatientContainer store={store} />);

  		expect(component.props()).toHaveProperty("patients");
  		expect(component.props().patients).toEqual(initialState.patients);
  	});
});
