'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {getPatient, setPatientId} from '../../../store/actions/patient/patient';
import config from '../../../config';

/**
 * Component for Search results items
 */
export default class SearchResultItem extends React.Component {
	constructor(props){
		super(props);

	}

	/**
	 * Dispatch getPatient action 
	 * @param  {Object} 
	 */
	clickHandler(event) {
		let id = event.currentTarget.getAttribute('data-id');

		this.props.dispatch(setPatientId(id));  
		this.props.dispatch(getPatient(config.api.PATIENT_PATH + id + config.api.PATIENT_FILE));
	}
  
	render() {	
		return (
			<li className={'list-item'} onClick={this.clickHandler.bind(this)} data-id={this.props.data.id}>
				<h4>{this.props.data.name}</h4>
				<ul>
					<li className='birthDate-item'  data-birthDate={new Date().getYear() - new Date(this.props.data.birthDate).getYear()} >age: {new Date().getYear() - new Date(this.props.data.birthDate).getYear()}</li>
					<li className='heightCm-item' data-heightCm={this.props.data.heightCm}>height: {this.props.data.heightCm} cm</li>
					<li className='weightCm-item' data-weightCm={this.props.data.weightKg}>weight: {this.props.data.weightKg} kg</li>
					<li className='bmi-item'  data-bmi={this.props.data.bmi}>bmi: {this.props.data.bmi}</li>
				</ul>
			</li>
		);
	}
} 
