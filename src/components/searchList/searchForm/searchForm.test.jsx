'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import SearchForm from './searchForm';
import InputField from '../../common/inputField/inputField';
import Button from '../../common/button/button';

let ascending = jest.fn(),
	descending = jest.fn(),
	onUserInput = jest.fn(),
	onUserSelectShort = jest.fn(),
	sortOptions = ['option1', 'option2'];
	  
describe('SearchForm', () => {
	let component;
 
	describe('renders', () => {
		beforeEach(() => {
			component = shallow(<SearchForm 
				ascending={ascending}
			    descending={descending}
			    onUserInput={onUserInput}
			    onUserSelectsort={onUserSelectShort}
			    sortOptions={sortOptions}
			    className='searchField'
			    placeholder='by name'
			    type='search'
			    time='600' /> );
		});

		it('(Snapshot)', () => {	 		
	  		expect(component).toMatchSnapshot(); 
		}); 

	 	describe('form', () => { 

			it('should contain form', () => {

				expect(component.find('form').exists()).toBe(true); 
			});
	 		describe('InputField', () => {
	 			it('should be rendered with attributes populated by props ', () => { 
					
					expect(component.find(InputField).exists()).toBe(true);
					expect(component.find(InputField).length).toBe(1);
					expect(component.find(InputField).props().placeholder).toEqual('by name'); 
					expect(component.find(InputField).props().className).toEqual('searchField'); 
					expect(component.find(InputField).props().type).toEqual("search");
					expect(component.find(InputField).props().onUserInput).toEqual(onUserInput); 
				});			
	 		});
	 		describe('SearchResults', () => {
	 			it('should render two Buttons', () => { 
					expect(component.find(Button).length).toBe(2);
	 			});
	 		});
	  	});
	}); 
});
