'use strict';

import React from 'react';
import {Debounce} from 'react-throttle';
import PropTypes from 'prop-types';

/**
 * Presentational component for showing error messages
 */
export default class WarningMessage extends React.Component {
	constructor(props){
		super(props);
	}
		
	render() {	
		return (<div className={'callout alert ' + this.props.hideClass} > { this.props.children }</div>);
	}
}
