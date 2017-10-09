'use strict';

export const SET_VISIBLE_SEARCH_RESULTS = 'SET_VISIBLE_SEARCH_RESULTS';
export const SET_INITIAL_VISIBLE_SEARCH_RESULTS = 'SET_INITIAL_VISIBLE_SEARCH_RESULTS';

/**
 * Action to set visible results
 * @param  {Array<Object>}   data to search in
 * @param  {String}  search term
 * @param  {Object}  data set for refining the search results
 * @return {Object} 
 */
export const setVisibleSearchResults = (dataToSearch, searchTerm, criterias) =>  ({
	type: SET_VISIBLE_SEARCH_RESULTS,
	dataToSearch: dataToSearch,
	searchTerm: searchTerm,
	criterias: criterias
});
    
/**
 * Action to set the initial visible results
 * @param  {Array<Object>}   data to search in
 * @return {Object} 
 */	
export const setInitialVisibleSearchResults = (dataToSearch) =>  ({
	type: SET_INITIAL_VISIBLE_SEARCH_RESULTS,
	dataToSearch: dataToSearch
});