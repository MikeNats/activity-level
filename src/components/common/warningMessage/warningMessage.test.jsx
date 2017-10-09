'use strict';

import React from 'react';
import 'whatwg-fetch';
import { shallow, mount } from 'enzyme';

import WarningMessage from './warningMessage';

describe('warningMessage', () => {
	let component;
 
	describe('renders', () => {

		it('(Snapshot)', () => {	 
			component = shallow(<WarningMessage> No results found! </WarningMessage> );

	  		expect(component).toMatchSnapshot(); 
		}); 

		describe('className', () => { 

			it('should contain default class names, if no className props are provided', () => {
				component = shallow(<WarningMessage> No results found! </WarningMessage> );
				
				expect(component.props().className.includes('undefined')).toBe(true);

			});

			it('should contain given class', () => {
				component = shallow(<WarningMessage hideClass = 'hide'> No results found! </WarningMessage> );
				
				expect(component.props().className.includes('hide')).toBe(true);
			});
		});
	}); 
});
