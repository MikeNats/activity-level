import React from 'react';
import SearchListContainer from '../searchList/searchListContainer';
import PatientContainer from '../patient/patientContainer';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {configAsyncActions} from '../../store/actions/config/config';
import {getConfig} from '../../store/actions/config/config';
import config from '../../config';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends React.Component {

	componentWillMount() {
		this.props.dispatch(getConfig(config.api.CONFIG_PATH));
	}

	render() {
		return (<section className='app row'>
			<section  className='searchListContainer columns panel secondary large-4 medium-4 small-16'>
				<h1 className='columns'>Activity level: 20 - 40</h1>
				<SearchListContainer  config={this.props.config} />
			</section>
			<section className='patientContainer columns left large-8 medium-8 small-16'>
				<PatientContainer  config={this.props.config} />
			</section>
			<section id='createdBy'><a href='https://www.linkedin.com/in/michail-tsougkranis-b490b730/' target='_blanck' >Michail Tsougkranis</a></section>
		</section>);
	}
}

const mapStateToProps = state => ({	
	config: state.config
});

export default connect(mapStateToProps)(App);



