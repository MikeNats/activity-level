/*global require, module, expect, browser*/
'use strict';

/**
 * Open the given URL
 * @param  {String}   type Type of navigation (url or site)
 * @param  {String}   page The URL to navigate to
 * @param  {Function} done Function to execute when finished
 */
module.exports = (type, page, done) => {
	/**
	 * The URL to navigate to
	 * @type {String}
	 */

	 if (type === 'only one') {

		 expect(browser.elements('.list-item').value.length).to.equal(1);

	 } else if (type === 'more than one') {

		 expect(browser.elements('.list-item').value.length).to.be.at.least(2);
	 } else {

	 	browser.pause(4000);
	 	expect(browser.elements('.list-item').value.length).to.be.at.least(4); 
	 }
		
};