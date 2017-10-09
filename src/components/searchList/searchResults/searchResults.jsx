import React from 'react';
import PropTypes from 'prop-types';
import SearchResultItem from '../searchResultItem/searchResultItem' ; 

/**
 * Presentational component for Search results
 */
export default class SearchResults extends React.Component {
	constructor(props){
		super(props);
	}

	resultsItems(){
		return this.props.visibleResults.map((resultData, index) => 
			 <SearchResultItem 
			 	key={resultData.id}
			 	data={resultData}
			 	dispatch={this.props.dispatch} />);
	}

	render() {	 
		return (<ul className='searchResults'> { this.resultsItems() } </ul>);		 	
	}
}
 