'use strict';

import React from 'react';
import 'whatwg-fetch';
import { shallow, mount } from 'enzyme';
import button from './button';
 
let testFunction = jest.fn();

describe('button', () => {
	let component;
 
	describe('renders', () => {

		it('(Snapshot)', () => {	 
			component = shallow(<button 
				idName  = 'textIdName'
				onClick  = { testFunction }
				className    = 'testClassName'>button text</button>);

	  		expect(component).toMatchSnapshot(); 
		});

		describe('Button', () => { 

			it('should populate the Button id with the given value', () => {
				 
				expect(component.props().idName.includes('textIdName')).toBe(true);
			});

			it('should invoke given callback when click event is triggered', () => {
				component.simulate('click');

				expect(testFunction).toHaveBeenCalled();  
			});
			
			it('should populate the className with given one', () => {
 
				expect(component.props().children.includes('button text')).toBe(true);
			});
		});	
	}); 
});
