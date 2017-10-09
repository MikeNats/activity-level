'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../../components/searchList/searchForm/searchForm';
import Button from '../../components/common/button/button';
import WarningMessage from '../../components/common/warningMessage/warningMessage';
import SearchResults from './searchResults/searchResults';
import {setVisibleSearchResults} from '../../store/actions/visibleSearchResults/visibleSearchResults';

/* 
* Container component for searchList components
**/
export default  class SearchList extends React.Component {
	constructor(props) {
		super(props);

		this.searchTerm = '';  
		this.criterias = {
			searchAgainst: 'name',
			nthVisibleResults: 5, 
			orderBy: {
				attribute: '', 
				descending: true,	
			}
		};
	}

	/**
	 * Upsates store with visible results 
	 */
	setVisibleResults() {
		this.props.dispatch(setVisibleSearchResults(this.props.dataToSearch.data, this.searchTerm, this.criterias));
	}
 
	/**
	 * When user types a search term. Search term is updated as well as the visible Products 
	 * @param  {String} searchTerm 
	 */
	onUserInput(searchTerm) {
		this.searchTerm = searchTerm;
		this.setVisibleResults();
	}

	/**
	 * Invocked when user selects sorting criteria
	 * @param  {String} option 
	 */
	onUserSelect(option) {
		this.criterias.orderBy.attribute = option;
		this.setVisibleResults();
	}

	/**
	 * Invocked when user selects ascending order
	 */
	ascendingOrder() {
		this.criterias.orderBy.descending = false;
		this.setVisibleResults();
	}

	/**
	 * Invocked when user selects descending order
	 */
	descendingOrder(){
		this.criterias.orderBy.descending = true;
		this.setVisibleResults();
	}

	/**
	 * pagination 
	 */
	pagination() {
		if (this.criterias.nthVisibleResults < this.props.dataToSearch.data.length)  {
			this.criterias.nthVisibleResults = this.criterias.nthVisibleResults + this.props.config.data[0].user.pagination;
			this.setVisibleResults();
		}
	}

	/**
	 * Boolean evaluation of dataToSearch and activities Redux status for isFetching
	 * @return {Boolean} 
	 */
	isFetchingData() {
		return (this.props.dataToSearch.isFetching || this.props.activities.isFetching);
	}

	/**
	 * Boolean evaluation of dataToSearch and activities Redux status for isFetching error
	 * @return {Boolean} 
	 */
	isErrorOccured() {
		return (this.props.dataToSearch.error.status || this.props.activities.error.status);
	}

	/**
	 * @todo add tests for pops:
	 * 1) SearchForm
	 * 2) SearchResults
	 * 3) Button
	 */
	searchListHTML() {
		switch(true) {
		case (this.isFetchingData()): //Render loader while loading
			return (<img src='./assets/img/loader.svg' />);

		case (this.isErrorOccured()): //Render message if any response did succeded 
			return (<WarningMessage> {this.props.dataToSearch.error.message} </WarningMessage>);

		case (!this.isErrorOccured() && !this.isFetchingData() && this.props.dataToSearch.data.length > 0):  
			return (
				<section id='serchList'  className='columns panel '>
					<section id='searchHeader' >
						<SearchForm 
							ascending={this.ascendingOrder.bind(this)}
							descending={this.descendingOrder.bind(this)}
							onUserInput={this.onUserInput.bind(this)}
							onUserSelectSort={this.onUserSelect.bind(this)}
							sortOptions={Object.keys(this.props.dataToSearch.data[0]).filter((attr) => 
								['birthDate', 'heightCm', 'weightKg', 'bmi', 'name'].includes(attr))}
							className='searchField'
							type='search'
							time='600' />
					</section>
					<section id='searchResult'>
						{this.searchResultsHTML()}
					</section>
				</section>);

		default:
			return  null;
		}
	}
	searchResultsHTML() {
		if(this.props.visibleSearchResults.length === 0 && this.searchAgainst !== '' ){
			return (<WarningMessage> No results found </WarningMessage>);

		}else {
			return (<section>
				<SearchResults
					dispatch={this.props.dispatch.bind(this)} 
					visibleResults={this.props.visibleSearchResults} 
					config={this.props.config} />
				<Button
					onClick={this.pagination.bind(this)} 
					className='columns large-16'
					hideClass={(this.props.visibleSearchResults.length < 5 ||   this.props.visibleSearchResults.length >= this.props.dataToSearch.data.length) ? 'hide' : ''} >show more</Button>
			</section>);
		}
	}
	render() {		
 		return (<section > {this.searchListHTML()}</section>);
	}	
	
}

SearchList.propTypes = {
	dataToSearch: PropTypes.object.isRequired,
	activities: PropTypes.object.isRequired,
	visibleSearchResults: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
};


