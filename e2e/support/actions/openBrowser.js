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

	let permalink = '/'
	if (type === "search page") {

		permalink = '/'
		
	}

	const url = (type === 'url') ? page : browser.options.baseUrl + permalink;

	browser.url(url);	
};