'use strict';

import React from 'react';
import {Debounce} from 'react-throttle';
import PropTypes from 'prop-types';

/**
 * Presentational component for Select
 */
export default class Select extends React.Component {
	constructor(props){
		super(props);
	}
	
	/**
	 * Callback to be invoked when click event occurs
	 * @param {Object} 
	 */
	handleChange(event){
    	this.props.changeHandler(event.target.value);
  	}

	/**
	 * Maps options array to ortions html elements
	 * @param  {Array<String>}  options 
	 * @return {Array<Objects>}        
	 */
	optionHTML(options = []) {
		return (options.map((option) => (<option className={option} key={option} value={option}> {option} </option>)));
	}

	render() {	
		return (
			<select 
				className={this.props.className} 
				onChange={this.handleChange.bind(this)} 
				name='select'> {this.optionHTML(this.props.options)} 
			</select>);
	}
}

