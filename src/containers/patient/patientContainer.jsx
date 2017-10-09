'use strict';

import React from 'react';
import Patient from '../../components/patient/patient';
import {connect} from 'react-redux';
import {format} from '../../store/reducers/patients/patients';
import config from '../../config';

/*
* Container component for Patient component
**/
class PatientContainer extends React.Component {
	constructor(props){
		super(props);
	}
 
	/* 
	* Render Patient component
	* @todo test for Object.assign
	**/
	render() {
		return (<Patient 
			activities={this.props.activities} 
			patient={Object.assign(this.props.patient, this.props.patients.data[this.props.patient.id])} />);
	}
}

const mapStateToProps = state => ({	
	patient: state.patient,
	patients: state.patients,
	activities: state.activities
});

export default connect(mapStateToProps)(PatientContainer);
