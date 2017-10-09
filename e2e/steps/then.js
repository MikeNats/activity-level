/*global require, module*/
'use strict';

const checkErrorMessageText = require('../support/checks/checkErrorMessageText');
const checkNumberOfItems = require('../support/checks/checkNumberOfItems');
const checkProductItemTitle = require('../support/checks/checkProductItemTitle');
const checkElementVisibility = require('../support/checks/checkElementVisibility');
const isRsultsOrdered = require('../support/checks/isRsultsOrdered'); 
const clickElement = require('../support/actions/clickElement');
const ckeckPageUrl = require ('../support/checks/ckeckPageUrl');
const ckeckPageContent = require('../support/checks/ckeckPageContent'); 
const checkResultsOrder = require('../support/checks/checkResultsOrder');
const selectOption = require('../support/checks/selectOption');

module.exports = function then() {

	this.Then(/^the error message "([^"]*)?" is displayed$/, checkErrorMessageText);
	this.Then(/^"([^"]*)?" item will "([^"]*)?" vissible$/, checkElementVisibility);
	this.Then(/^"([^"]*)?" items will be vissible$/, checkNumberOfItems);
	this.Then(/^visible "([^"]*)?" title will contains "([^"]*)?"$/, checkProductItemTitle);
	this.Then(/^"([^"]*)?" button will "([^"]*)?" visible$/, checkElementVisibility);

	this.Then(/^the the results should be "([^"]*)?"$/, isRsultsOrdered);

	this.Then(/^user clicks "([^"]*)?" button$/, clickElement);

	this.Then(/^results should be ordered by "([^"]*)?" order with option "([^"]*)?"$/, checkResultsOrder);

	this.Then(/^user select from "([^"]*)?" with option "([^"]*)?"$/, selectOption);

}; 