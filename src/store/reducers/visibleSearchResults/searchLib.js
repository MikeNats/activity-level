'use strict';

/**
 * Checks if value attribute is String
 * @param  {<Any>} value  
 * @return {[Boolean]}
 */
const isString = (value) => typeof value  === 'string',

	/**
	 * Checks if value attribute is Number
	 * @param  {<Any>} value   
	 * @return {[Boolean]}
	 */
	isNumber = (value) => typeof value  === 'number',

	/**
	 * Checks if value attribute is Date
	 * @param  {<Any>} value  
	 * @return {[Boolean]}
	 */
	isDate = (value) => typeof (value || {}).getTime === 'function',

	/**
	 * Orders Array of Objects based on Number comparison 
	 * @param  {[String]} attribute 
	 * @param  {[Object]} a   
	 * @param  {[Object]} b  
	 * @return {[Boolean]}
	 */
	sortNumbers = (attribute = '' , a = {}, b = {}) => a[attribute] - b[attribute],

	/**
	 * Orders Array of Objects based on Dates comparison 
	 * @param  {[String]} attribute 
	 * @param  {[Object]} a   
	 * @param  {[Object]} b    
	 * @return {[Boolean]}
	*/
	sortDates = (attribute = '', a = {}, b = {}) => a[attribute].getTime() - b[attribute].getTime();


/**
 * Find age spectrum
 * @param  {Array<Object>} dataToSearch    
 * @param  {Number} max    
 * @param  {Number} min    
 * @return {Array<Object>}
 */  
export const ageSpectrum = (data = [], max = 40, min = 20) => data.filter(dataItem => {
	let diff = new Date() - dataItem.birthDate,
		age = Math.floor(diff/31536000000);//http://jsfiddle.net/Mikey/xHTPL/

	return age <= max && age >= min;
});
/**
 * Orders Array of Objects based on String comparison 
 * @param  {[String]} attribute 
 * @param  {[Object]} a   
 * @param  {[Object]} b   
 * @return {[Boolean]}
 */
export const sortStrings = (attribute = '', a = {}, b = {}) => { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	let  nameA = a[attribute].toUpperCase(), // ignore upper and lowercase
		 nameB = b[attribute].toUpperCase(); // ignore upper and lowercase
	
	if (nameA < nameB) {

		return -1;
	}
	if (nameA > nameB) {

		return 1;
	}

	return 0; // names must be equal
};

/**
 * Orders Array of Objects based on String comparison 
 * @param  {String} attribute 
 * @param  {Array<Objects>} dataToOrder   
 * @return {Array<Objects>}
 */
export const sortByAttribute = (attribute = '', dataToOrder = [{}]) => {  
	switch(true){

	case(isString((dataToOrder[0] || {})[attribute], attribute)):

		return dataToOrder.sort((a, b) => sortStrings(attribute, a, b));

	case(isDate((dataToOrder[0] || {})[attribute], attribute)):

		return dataToOrder.sort((a, b) => sortDates(attribute, a, b));

	case(isNumber((dataToOrder[0] || {})[attribute], attribute)):

		return dataToOrder.sort((a, b) => sortNumbers(attribute, a, b));

	default:

		return dataToOrder; 
	}
};