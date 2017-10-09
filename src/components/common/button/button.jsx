'use strict';

import React from 'react';
import {Debounce} from 'react-throttle';
import PropTypes from 'prop-types';
 
/**
 * Presentational component for button
 */
export default class Button extends React.Component {
	constructor(props){
		super(props);
	}
		 
	/**
	 * Callback to be invoked when click event occurs
	 */
	onUserClick(event){
		event.preventDefault();
    	this.props.onClick(event.target.value);
  	}
  	
	render() {	
		return (<button  
			  id={this.props.idName}
			  className={'button ' + this.props.className + ' ' + (this.props.hideClass || '')}
			  onClick={this.onUserClick.bind(this)} > 
			  { this.props.children }</button>);
	}

}

Button.PropTypes = {
	onClick: PropTypes.func.isRequired
};