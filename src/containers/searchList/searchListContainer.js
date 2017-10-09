'use strict';

import React from 'react';
import SearchList from '../../components/searchList/searchList.jsx';
import {connect} from 'react-redux';
import {getActivities} from '../../store/actions/activities/activities';
import {getPatients} from '../../store/actions/patients/patients';
import {activitiesActions} from '../../store/actions/activities/activities';
import {patientsActions} from '../../store/actions/patients/patients';
import {format} from '../../store/reducers/patients/patients';
import config from '../../config';

/*
* Container component for searchList component
**/
class SearchListContainer extends React.Component {
	constructor(props){
		super(props);
	}
 
	/*
	* Ajax request to fetch products
	**/
	componentWillMount() {
		this.props.dispatch(getActivities(config.api.ACTIVITIES_PATH));
		this.props.dispatch(getPatients(config.api.PATIENTS_PATH));
	}

	/* 
	* Render searchList component
	**/
	render() {
		return (<SearchList 
		  dataToSearch={this.props.patients} 
		  visibleSearchResults={(this.props.visibleSearchResults || [])}
		  activities={this.props.activities}
		  dispatch={this.props.dispatch}
		  config={this.props.config} />);
	}
}

const mapStateToProps = state => ({	
	patients: state.patients,
	activities: state.activities,
	visibleSearchResults: state.visibleSearchResults,
	config: state.config
});

export default connect(mapStateToProps)(SearchListContainer);
