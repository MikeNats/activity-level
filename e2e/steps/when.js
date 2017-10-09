import typeSearchTerm from '../support/actions/typeSearchTerm';


module.exports = function when() {
	
	this.When(/^user query is "([^"]*)?"$/, typeSearchTerm);
};