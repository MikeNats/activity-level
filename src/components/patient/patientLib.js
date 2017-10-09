'use strict';

/**
 * [description]
 * @param  {Array}  array         
 * @param  {Object} obj           
 * @param  {String} attrToMatch   
 * @param  {String} attrToProject 
 * @return {[type]}               
 */
export const extendObjectFromArray = (obj = {}, attrToMatch = '', array = [], attrToProject = '') => 
	array.filter(objArr => obj[attrToMatch] === objArr[attrToMatch])
		.map(objArr => Object.assign(obj, {[attrToProject]: objArr[attrToProject]}));

/**
 * Given an array of same type of object [{attr: number}] and the name of the attr
 * should return the total sum
 * @param  {Array<Object>}  arr  
 * @param  {String} attr 
 * @return {Number}      
 */
export const sumOfObjArray = (arr = [], attr = '') => {
	let sum = 0;

	arr.forEach((set) =>{
		sum += set[attr];
	});

	return sum;
};
/**
 * Given an array of objects [{attr: String,..}] and the name of the attribute attr
 * should return the values of the given attr
 * @param  {Array<Object>}  arr  
 * @param  {String} attr 
 * @return {Array<Object>}      
 */
export const filterByAttribute = (arr = [], attr = '') => {
	let uniqueValues = [];
	
	arr.forEach((obj) => {
		if(!uniqueValues.includes(obj[attr])) {
			uniqueValues.push(obj[attr]);
		}
	});

	return uniqueValues;
};

/**
 * Given an array of objects [{attr: any}] and array of attr
 * should return an Object that contains the attr of each array
 * @param  {Array<Object>}  arr  
 * @param  {Array<String>} attr 
 * @return <Object>     
 */
export const projectArrayToObject = (arr = [], attrs = []) => {
	let obj = {};

	attrs.forEach((attr) => {
		let value = (arr.filter((item) => item[attr]) || [[]])
			.reduce((a, b) => a.concat(b))[attr];

		if(value) {
			obj[attr] = value;
		}
	});

	return obj;
};



