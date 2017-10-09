
module.exports = (selector, option) => {

	
	// browser.element(selector).click();
	// browser.element(option).click();


    // browser.click(selector).click();
    
console.log('>>>>>>>>>>',selector, option);

    browser.execute(function(option) {
		var el = document.querySelector("." + option); 
		el.setAttribute('selected', true);
        var event = new Event('input');
        el.dispatchEvent(event);
    }, option);

    browser.element(selector).click();
    browser.element('.' + option).click();

}

