'use strict';

import React from 'react';
import 'whatwg-fetch';
import { shallow, mount } from 'enzyme';

import Patient from './patient';
 
 let mockDataActivities = { 
 	data: [{
	     "activity": "sleeping",
	     "intensity": "none"
	   },
	   {
	     "activity": "stationary-awake",
	     "intensity": "low"
	   },
	   {
	     "activity": "walking",
	     "intensity": "moderate"
	   },
	   {
	     "activity": "cycling",
	     "intensity": "moderate"
	   },
	   {
	     "activity": "swimming",
	     "intensity": "vigorous"
	   },
	   {
	     "activity": "running",
	     "intensity": "vigorous"
	   }]
	},
  mockDataPatient = { 
  	isVisible: true,
  	data: [
		{
			"activity": "sleeping",
			"minutes": 540
		},
		{
			"activity": "walking",
			"minutes": 75
		},
		{
			"activity": "stationary-awake",
			"minutes": 765
		},
		{
			"activity": "swimming",
			"minutes": 60
		},
		{
			"activity": "running",
			"minutes": 60
		}
	]
};

describe('patient', () => {
	let component;
 
	describe('renders', () => {

		it('(Snapshot)', () => {	 
			component = shallow(<Patient  
			  activities={mockDataActivities} 
			  patient={mockDataPatient}/>);

			expect(component).toMatchSnapshot(); 
		});
		describe('Patient is visible', () => {
			describe('results', () => {
				describe('One of the criteria fails', () => {
					beforeEach(() => {
						component = shallow(<Patient  
							  activities={mockDataActivities} 
							  patient={mockDataPatient}/>);
					});

					it('should fail moderate', () => {		
						expect(component.find('.moderate.alert').exists()).toEqual(true)		
					});
					it('should succed vigorous', () => {		
						expect(component.find('.vigorous.success').exists()).toEqual(true)		
					}); 
				});
				describe('All of the criteria succeed', () => {
					 let successDataPatient = { 
					  	isVisible: true,
					  	data: [
							{
								"activity": "walking",
								"minutes": 175
							},
							{
								"activity": "swimming",
								"minutes": 60
							},
							{
								"activity": "running",
								"minutes": 60
							}
						]};
						
					beforeEach(() => {
						component = shallow(<Patient  
							  activities={mockDataActivities} 
							  patient={successDataPatient}/>);
					});

					it('should succed moderate', () => {		
						expect(component.find('.moderate.success').exists()).toEqual(true)		
					});
					it('should succed vigorous', () => {		
						expect(component.find('.vigorous.success').exists()).toEqual(true)		
					}); 
				});
				describe('Both of the criteria fails', () => {
					let localMockDataPatien = {
						data: [].concat(mockDataPatient.data, [])
					} 

					localMockDataPatien.data.pop();
				
					beforeEach(() => {
						component = shallow(<Patient  
							  activities={mockDataActivities} 
							  patient={localMockDataPatien}/>);
					});

					it('should fail moderate', () => {		
						expect(component.find('.moderate.success').exists()).toEqual(false)		
					});
					it('should succed vigorous', () => {		
						expect(component.find('.vigorous.success').exists()).toEqual(false)		
					}); 
				});
			});
		});
	}); 
});
