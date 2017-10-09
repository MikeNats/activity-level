'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {sumOfObjArray, filterByAttribute, projectArrayToObject, extendObjectFromArray} from './patientlib';


/**
 * Component for  Patient
 */
export default class Patient extends React.Component {
	constructor(props){
		super(props);
		this.results = [];

	}

	componentWillMount() {
		this.setState({
			hide: ''
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			hide: ''
		});
	}

	/**
	 * Returns full patient birth day
	 * @return {String}
	 */
	getDateOfBirth(){
		return new Date(this.props.patient.birthDate).getFullYear() + '/' + new Date(this.props.patient.birthDate).getMonth() + '/'  + new Date(this.props.patient.birthDate).getDate();
	}

	/**
	 * **** It took me 2h++ for the below method  ****
	 * Calculation of the patient results
	 */
	patientResult (patientActivities = [], activities = []) {		
		let patientActivitiesWithIntensity = patientActivities.map((patientActivity) =>                                 
				extendObjectFromArray(patientActivity, 'activity', activities, 'intensity'))    //for each patient activity, extend patient patientActivity including intensity {"activity": "sleeping","minutes": 540, "type": "moderate"}
				.reduce((a, b) => a.concat(b)),  											//Format the resuting data [[{}],[{}]] => [{}, {}]	

			intencityToMinuites = filterByAttribute(activities, 'intensity').map((intensity) => 
				patientActivitiesWithIntensity.filter((patientActivity) => patientActivity['intensity'] === intensity)) //keep only patient intensities
				.filter((arr) => arr.length > 0)																			// clear empty arrays because case all intensities > patient intensities 
				.map((group) => ({[group[0]['intensity']]: sumOfObjArray(group, 'minutes')})); 								// [{'moderate' : 400},...{}]

		this.results = projectArrayToObject(intencityToMinuites, filterByAttribute(patientActivities, 'intensity')); 			//[{'moderate' : 400},...{}] => {'moderate' : 400,...} 
	}

	/**
	 * HTML if no relevant data found
	 * @return {Object || null}
	 */
	noActivityHTML() {
		if (!this.results['moderate'] && !this.results['vigorous']) {
			return (<section className='callout allCriteria alert' > No activity found </section>);
		}
		return null;
	}

	/**
	 * HTML for moderate Intencity
	 * @return {Object || null}
	 */
	moderateIntencityHTML() {
		if (this.results['moderate']) {
			return (<section className={this.results['moderate'] < 150 ? 'callout moderate alert' : 'callout moderate success'}> Moderate: {this.results['moderate']} min</section>);
		}
		return null;
	}

	/**
	 * HTML for vigorous Intencity
	 * @return {Object || null}
	 */
	vigorousIntencityHTML() {
		if (this.results['vigorous']) {
			return (<section className={this.results['vigorous'] < 75 ? 'callout vigorous alert' : 'callout vigorous success'}> Vigorous: {this.results['vigorous']} min</section>);
		}
		return null;
	}

	/**
	 * HTML for moderate && vigorous Intencity
	 * @return {Object || null}
	 */
	moderateAndVigorousIntencityHTML() {
		if (this.results['moderate'] && this.results['vigorous'] && this.results['vigorous'] < 75 && this.results['moderate'] < 150) {
			return (<section className={(this.results['vigorous'] < 25 && this.results['moderate'] < 100) ? 'callout vigorousModerate alert' : 'callout vigorousModerate success'} >Vigorous: {this.results['vigorous']} min | Moderate: {this.results['moderate']} min</section>);
		}
		return null;
	}

	hide(event){
		this.setState({
			hide: 'hide'
		});
	}

	/**
	 * HTML for patient
	 */
  	patientHTML () {
 		switch(true) {
		case(this.props.patient.isVisible):
			this.patientResult(this.props.patient.data, this.props.activities.data);	

			return (<article className={'columns patient ' + this.state.hide}>
				<img width='100' src={this.props.patient.photo ? this.props.patient.photo : './assets/img/userPhoto.jpg'} />
				<span onClick={this.hide.bind(this)} className='hidePatient'>close</span>

				<h4>{this.props.patient.name}</h4>
				{this.noActivityHTML()}
				{this.moderateIntencityHTML()}
				{this.vigorousIntencityHTML()}
				{this.moderateAndVigorousIntencityHTML()}
						
			</article>);
		default:
			return null;
		}
 	}
	render() {	
		return(<section>{this.patientHTML()}</section>);
	}
} 
