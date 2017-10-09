'use strict';

import { SET_VISIBLE_SEARCH_RESULTS, SET_INITIAL_VISIBLE_SEARCH_RESULTS, setVisibleSearchResults, setInitialVisibleSearchResults } from  './visibleSearchResults';
  
describe('visibleSearchResults  Actions', () => {
    describe('setVisibleSearchResults', () => {

        it('should be pure function', () => { 
            expect(setVisibleSearchResults(['searchTerm'], 'searchTerm', {})).toEqual({type: SET_VISIBLE_SEARCH_RESULTS, dataToSearch:['searchTerm'], searchTerm: 'searchTerm', criterias:{} });
        });
    });

    describe('setInitialVisibleSearchResults', () => {
        
        it('should be pure function', () => { 
            expect(setInitialVisibleSearchResults(['searchTerm'])).toEqual({type: SET_INITIAL_VISIBLE_SEARCH_RESULTS, dataToSearch:['searchTerm']});
        });
    });
});
