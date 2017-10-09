'use strict';

import React from 'react';
import 'whatwg-fetch';
import { shallow, mount } from 'enzyme';
import Select from './select';

let mockData =  ['option1', 'option2', 'option3'],
	changeHandler = jest.fn();

describe('Select', () => {
	let component;
 
	describe('renders', () => {
		component = shallow(<Select 
			options={mockData}
			changeHandler = {changeHandler}/>);

		it('(Snapshot)', () => {	 		

	  		expect(component).toMatchSnapshot(); 
		});		

		it('should populate the select with the  given number of options', () => {
			 
			expect(component.find('option').length).toEqual(3);
		});

		it('should invoke changeHandler when change is triggered', () => {
			let event = {target: {value: "ption1"}};
			
			component.find('select').simulate('change', event);
			 
			expect(changeHandler).toHaveBeenCalled();
		});
	}); 
});
