'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import SearchResultItem from './searchResultItem';


let dispatch = jest.fn(),
	mockData =  { "data" : {
	    "id": 1,
	    "name": "Gregor van Vloten",
	    "gender": "male",
	    "birthDate": "1986-05-09",
	    "heightCm": 193,
	    "weightKg": 69.6,
	    "bmi": 18.6
  }
};  

describe('SearchResultItem', () => {
	let component;

	describe('renders', () => {
		beforeEach(() => {
			component = shallow(<SearchResultItem 
				data = {mockData}
				dispatch = {dispatch} />);
		});


		it('(Snapshot)', () => {	 
			
	  		expect(component).toMatchSnapshot();
		}); 

		describe('li', () => { 
			it('should contain li', () => {

				expect(component.find('li').exists()).toBe(true); 
			});

			it('should dispach action `getPatient` when click event is triggered', () => {
				let event = {currentTarget: {getAttribute:() => 1}};
			
				component.find('.list-item').simulate('click', event); 

				expect(dispatch).toHaveBeenCalled();
			});	
		});
	}); 
});
