'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../common/inputField/inputField';
import Button from '../../common/button/button';
import Select from '../../common/select/select';

/**
 * Presentational component for Search form
 */
export default  class SearchForm extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps ? true : null;
	}

	/*
	* Search Header Html
	**/	
	render() {
		return(	
			<form>	
				<fieldset>
					<legend> Search </legend>

					<InputField 
						placeholder='by name' 
						className={this.props.className} 
						onUserInput={this.props.onUserInput}
						type={this.props.type} 
						debounceTime={this.props.debounceTime} />
				</fieldset>

				<fieldset>
					<legend> Sort By </legend>
					<Select 
			    		className='orderBy columns large-8 medium-12'
			    		changeHandler={this.props.onUserSelectSort} 
			    		options={this.props.sortOptions} />
					<Button className='descending' onClick={this.props.descending}> &darr; </Button>
					
					<Button className='ascending' onClick={this.props.ascending}> &uarr;</Button>
				</fieldset>
			</form>);
	}
}
