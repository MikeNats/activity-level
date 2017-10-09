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

	if(type === "empty string") {
		let currentQuery = browser.element('.searchField').getValue().split('') || [];
		for (let i=0; i<= currentQuery.length; i++) {
			browser.element('.searchField').keys("\uE003").pause(50);
		}
		

	 } else {
	 	browser.element('.searchField').setValue(type);
	 }
	
	browser.pause(1000)
		
}