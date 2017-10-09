'use strict';

import React from 'react';
import 'whatwg-fetch';
import { shallow, mount } from 'enzyme';
import InputField from './InputField';

let testFunction = jest.fn();

describe('InputField', () => {
	let component;
 
	describe('renders', () => {

		it('(Snapshot)', () => {	 
			component = shallow(<InputField 
				placeholder  = 'some text'
				onUserInput  = { testFunction }
				className    = 'testClassName'
				type         = 'search'
				debounceTime = '0' />);

	  		expect(component).toMatchSnapshot(); 
		});

		describe('Debounce', () => { 
			it('should populate the Debounce time attribute with the given value', () => {
				
				expect(component.props().time.includes('0')).toBe(true);
			});
			describe('input', () => { 

				it('should populate the input place holder with the given value', () => {
					 
					expect(component.props().children.props.placeholder.includes('some text')).toBe(true);
				});
				it('should invoke given callback when onChange event is triggered', () => {
					let event = {target: {value: "spam"}}
					component.find('input').simulate('change', event)

					expect(testFunction).toHaveBeenCalled();  
				});
				it('should populate the className with given one', () => {
	 
					expect(component.props().children.props.className.includes('testClassName')).toBe(true);
				});
				it('should populate the type with given one', () => {
	 
					expect(component.props().children.props.type.includes('search')).toBe(true);
				});
			});
		});
	}); 
});
