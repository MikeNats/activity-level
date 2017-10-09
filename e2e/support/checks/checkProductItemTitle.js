/**
 * Open the given URL
 * @param  {String}   type Type of navigation (url or site)
 * @param  {String}   page The URL to navigate to
 * @param  {Function} done Function to execute when finished
 */
module.exports = (type1, type2, page, done) => {
	/**
	 * The URL to navigate to
	 * @type {String}
	 */

	 if (type1 === 'product') {
 		 expect(browser.element('#searchResults h3').getText()).to.have.string(type2);
	 } else {
	 	[].forEach.call(browser.elements('#searchResults h3'),(ele) => {
	 		expect(ele.getText()).to.have.string(type2);
	 	});
	 }

		
}