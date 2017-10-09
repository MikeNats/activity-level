
module.exports = (pageUrl) => {

	if (pageUrl === 'index') {
		pageUrl = '/'
	} 

	expect(browser.getUrl()).to.have.string(pageUrl);

}