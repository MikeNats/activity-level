'use string';

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import SearchResults from './searchResults';
import SearchResultItem from '../searchResultItem/searchResultItem'


const mockData =  [{
    "id": 1,
    "name": "Gregor van Vloten",
    "gender": "male",
    "birthDate": "1986-05-09",
    "heightCm": 193,
    "weightKg": 69.6,
    "bmi": 18.6
  },
  {
    "id": 2,
    "name": "Susanne Marcil",
    "gender": "female",
    "birthDate": "1984-11-18",
    "heightCm": 159,
    "weightKg": 102.8,
    "bmi": 40.6
  }];
	  
describe('SearchResults', () => {
	let component;
 
	describe('renders', () => {
		beforeEach(() => {
			component = shallow(<SearchResults
			 	visibleResults = { mockData } /> );
		});

		it('(Snapshot)', () => {	 
			
	  		expect(component).toMatchSnapshot();
		}); 
	 
	 	describe('ul', () => { 

			it('should contain ul', () => {

				expect(component.find('ul').exists()).toBe(true); 
			});

			describe('SearchResultItem', () => {

				it('should map props.visibleProducts to SearchResultItem', () => {

					expect(component.find(SearchResultItem).length).toEqual(2); 
				});
	 		});	
	  	});
	 }); 
});
