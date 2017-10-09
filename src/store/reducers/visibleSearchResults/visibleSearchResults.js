'use strict';

import {SET_VISIBLE_SEARCH_RESULTS, SET_INITIAL_VISIBLE_SEARCH_RESULTS} from '../../actions/visibleSearchResults/visibleSearchResults';
import {sortByAttribute, sortStrings} from './searchLib';
import  config from '../../../config';

/**
 * If empty string return given data else filters given data by comparing searchTerm with searchAgains value
 * @param  {Array<Object>} dataToSearch  
 * @param  {String} searchTerm    
 * @param  {Object} searchAgainst 
 * @return {Array<Object>}  
 * @todo This can expand so as to get multiple AND/OR criteria 
 */
const serchPerCtiteria = (dataToSearch = [], searchTerm = '', searchAgainst = {}) => 
    	searchTerm.trim().length === 0 ? [].concat(dataToSearch) : dataToSearch.filter((data) =>
        	data[searchAgainst].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

/**
 * Slice with given number
 * @param  {Array<Object>} dataToSearch  
 * @param  {Object} searchTerm    
 * @return {Array<Object>}
 */  
const  pagination = (data = [], criterias = {}) => data.slice(0, (criterias.nthVisibleResults || 5));
 

/**
 * Slice with given number
 * @param  {Array<Object>} dataToSearch  
 * @param  {Object} searchTerm    
 * @return {Array<Object>}
 * @todo  If that was a real app pagination should be an async action to fetch and update patients in Redux.    
 */
const orderBy = (data, descending) => descending ? data : data.reverse();

/**
 * Filtering per given searchTerm
 * Then order the data per given criteria 
 * Slicing with maximum number of visible results 
 * @param  {Array<Objects>}  dataToSearch 
 * @param  {String} searchTerm   
 * @param  {Object} criterias    
 * @return {Array<Objects>}              
 */
const setVisibleResults = (dataToSearch = [], searchTerm = '', criterias = {}) =>  {  
	let dataSearchedByTerm = serchPerCtiteria(dataToSearch, searchTerm, criterias.searchAgainst),
		sortredData = sortByAttribute(criterias.orderBy.attribute, dataSearchedByTerm);
          
	return pagination(orderBy(sortredData, criterias.orderBy.descending), criterias);
};

export const defaultAction = {//action default value
	type: 'UNSUPPORTED',
	dataToSearch: [],
	searchTerm: '',
	criterias: {            
		searchAgainst: 'name',
		pagination: 10, 
		orderBy: {
			attribute: 'gender', 
			descending: true,    
		}
	}
};
/**
 * Set visible results to store
 * @param  {Array<Objects>}  state  
 * @param  {Object} action 
 * @return {Array<Objects>}       
 */  
export const visibleSearchResults = (state = [], action = defaultAction) => {
	switch (action.type) {   
	case SET_INITIAL_VISIBLE_SEARCH_RESULTS:
		return pagination(action.dataToSearch).sort((a, b) => 
            	sortStrings('name', a, b, true));

	case SET_VISIBLE_SEARCH_RESULTS:
		return setVisibleResults(action.dataToSearch, action.searchTerm, action.criterias);
	default:
		return state;
	}
};
  