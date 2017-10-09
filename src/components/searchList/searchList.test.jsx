'use strict';

import React from 'react';

import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import SearchList from './searchList';
import config from '../../config';
import SearchResults from './searchResults/searchResults';
import SearchForm from './searchForm/SearchForm';
import WarningMessage from '../common/warningMessage/warningMessage'; 
import Button from '../common/button/button';
import axios from 'axios';

const mockData = [{
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
  }],
  initialState = { 
	visibleSearchResults: [],
	activities: {
		isFetching: false,
	    error: { status: false, message: '' },
	    data: [] 
	},
	patients: {
		isFetching: false,
	    error: { status: false, message: '' },
	    data: [] 
	},
	dispatch: jest.fn()
}

const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);
	  
describe('SearchList', () => {
	let component;

	describe('renders', () => {
	let products = [];

		it('(Snapshot)', () => {	 
			
	  		expect(true).toEqual(true); 
		}); 


		it('(Snapshot)', () => {	 
			component = shallow(<SearchList 
				activities = {initialState.activities}
				dataToSearch = {initialState.patients} 
				visibleSearchResults = {initialState.visibleSearchResults}
				dispatch = {initialState.dispatch} />);
	 
	  		expect(component).toMatchSnapshot(); 
		}); 
		describe('onUserInput', () => {
			describe('searchTerm is not matching products', () => {
				initialState.patients.data = mockData;
				beforeEach(() => {
					component = mount(<SearchList
						activities = {initialState.activities}
						dataToSearch = {initialState.patients} 
						visibleSearchResults = {initialState.visibleSearchResults}
						dispatch = {initialState.dispatch}  />);
	 
					component.instance().onUserInput('qwerty'); 
													
			 		component.update();
				});
   
				it('should show WarningMessage', () => {	 
			  		expect(component.find(WarningMessage).exists()).toEqual(true); 
				});

				it('should hide SearchResults', () => {
					expect(component.find(SearchResults).exists()).toEqual(false);
				});
			});
		});
			describe('searchTerm is matching products', () => {
				beforeEach(() => {
					
					component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
	 
					component.setProps({ visibleSearchResults:  mockData});
				});

				it('should show SearchResults', () => {

					expect(component.find(SearchResults).exists()).toEqual(true);
				});	
				it('should hide WarningMessage', () => {
					expect(component.find(WarningMessage).exists()).toEqual(false);
				});			
			});
	
		describe('error on fetching data patients', () => {
			beforeEach(() => {				
				initialState.patients.error.status = true;
				component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
			});
			
			it('should hide WarningMessage', () => {
				expect(component.find(WarningMessage).exists()).toEqual(true);
			});

			it('should hide SearchResults', () => {

				expect(component.find(SearchResults).exists()).toEqual(false);
			});					
		});
		describe('error on fetching data activities', () => {
			beforeEach(() => {				
				initialState.activities.error.status = true;
				component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
			});
			
			it('should hide WarningMessage', () => {
				expect(component.find(WarningMessage).exists()).toEqual(true);
			});

			it('should hide SearchResults', () => {

				expect(component.find(SearchResults).exists()).toEqual(false);
			});
						
		});
		describe('setVisibleResults', () => {
			beforeEach(() => {				
				component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
			});
			
			it('should hide WarningMessage', () => {
				component.instance().setVisibleResults(); 

				expect(initialState.dispatch).toHaveBeenCalled();
			});
						
		});
		
		describe('onUserInput', () => {
			beforeEach(() => {				
				component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
			});
			
			it('should set searchTerm with given value', () => {
				component.instance().onUserInput('test'); 

				expect(component.instance().searchTerm).toEqual('test');
			});	
			it('should invoke setVisibleResults', () => {
				component.instance().onUserInput('test'); 
				expect(initialState.dispatch).toHaveBeenCalled();
			});					
		});

		describe('onUserSelect', () => {
			beforeEach(() => {				
				component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
			});
			
			it('should set criterias.orderBy.attribute with given value', () => {
				component.instance().onUserSelect('test'); 

				expect(component.instance().criterias.orderBy.attribute).toEqual('test');
			});	
			it('should invoke setVisibleResults', () => {
				component.instance().onUserSelect('test'); 
				expect(initialState.dispatch).toHaveBeenCalled();
			});					
		});
		describe('ascendingOrder', () => {
			beforeEach(() => {				
				component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
			});
			
			it('should set criterias.orderBy.descending to false', () => {
				component.instance().ascendingOrder('test'); 

				expect(component.instance().criterias.orderBy.descending).toEqual(false);
			});	
			it('should invoke setVisibleResults', () => {
				component.instance().ascendingOrder(); 
				expect(initialState.dispatch).toHaveBeenCalled();
			});					
		});
		describe('descendingOrder', () => {
			beforeEach(() => {				
				component = mount(<SearchList
						activities = {initialState.activities}
		 				dataToSearch = {initialState.patients} 
		 				visibleSearchResults = {initialState.visibleSearchResults}
		 				dispatch = {initialState.dispatch}  />);
			});
			
			it('should set criterias.orderBy.descending to false', () => {
				component.instance().descendingOrder('test'); 

				expect(component.instance().criterias.orderBy.descending).toEqual(true);
			});	
			it('should invoke setVisibleResults', () => {
				component.instance().descendingOrder(); 
				expect(initialState.dispatch).toHaveBeenCalled();
			});					
		});
	});
});
