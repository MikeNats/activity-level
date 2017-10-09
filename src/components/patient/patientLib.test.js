'use strict';

import {sumOfObjArray, filterByAttribute, projectArrayToObject, extendObjectFromArray} from './patientLib';

describe('patientLib', ()=> {
	describe('sumOfObjArray ', ()=> {
		describe('given an array of same type of object [{attr: number}] and the name of the attr', () => {

			it('should return the total sum', () => {
				let mockData = [{myAttr: 10}, {myAttr: 10}];

				expect(sumOfObjArray(mockData, 'myAttr')).toEqual(20);
			});
		});
	});
	describe('filterByAttribute ', () => {
		describe('given an array of objects [{attr: String}] and the name of the attr', () => {

			it('should return the values of the given attr', () => {
				let mockData = [{myAttr: 'test1'}, {myAttr: 'test2'}, {myAttr: 'test1'}];

				expect(filterByAttribute(mockData, 'myAttr').length).toEqual(2);
			});
		});
	});
	describe('projectArrayToObject ', () => { 
		describe('given an array of objects [{attr: any}] and array of attr', () => {

			it('should return an Object that contains the attr of each array', () => {
				let mockData = [{myAttr1: 'test1'}, {myAttr2: 'test2'}, {myAttr3: 'test2'}];

				expect(projectArrayToObject(mockData, ['myAttr1', 'myAttr2'])).toEqual({myAttr1: 'test1', myAttr2: 'test2'});
			});
		});
	});	
	describe('extendObjectFromArray ', () => { 
		describe('given object that the value of its attribute match with the value of object array', () => {

			it('should return an extended initial object with the sibling pair attr value of the object array', () => {
				let mockDataArr = [{
						'activity': 'sleeping',
						'intensity': 'none'
					},
					{
						'activity': 'walking',
						'intensity': 'moderate'
					},
					{
						'activity': 'cycling',
						'intensity': 'moderate'
					},
					{
						'activity': 'swimming',
						'intensity': 'vigorous'
					},
					{
						'activity': 'running',
						'intensity': 'vigorous'
					}],
					mockDataOj = {'activity': 'walking', 'minutes': 75};

				expect(extendObjectFromArray(mockDataOj, 'activity', mockDataArr, 'intensity')).toEqual([{'activity': 'walking', 'minutes': 75, 'intensity': 'moderate'}]);
			});
		});
	});
});


