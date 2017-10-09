/**
 * Check the title of the current browser window
 * @param  {Type}     falseCase     Whether to check if the title matches the
 *                                  expected value or not
 * @param  {Type}     expectedTitle The expected title
 * @param  {Function} done          Function to execute when finished
 */


Array.prototype.isSorted = function() {
	return (function(direction) {
		return this.reduce(function(prev, next, i, arr) {
		  if (direction === undefined)
		    return (direction = prev <= next ? true : false) || true;
		  else
		    return (direction + 1 ?
		      (arr[i-1] <= next) : 
		      (arr[i-1] >  next));
		}) ? Number(direction) : false;
	}).call(this);
}




module.exports = (orderStatus) => {
    /**
     * The title of the current browser window
     * @type {String}
     */

	let elements = browser.elements('#searchResults ul li p').getText();
	let elementsToBeSorted = [];

	elements = elements.map((ele) => {
		return +ele.replace(' £', '')
	});

	elementsToBeSorted = elementsToBeSorted.concat(elements);
	if (orderStatus === 'unordered') {
		expect(elements.isSorted()).to.be.false;
	} else if (orderStatus === 'ordered by highter to lower price') {
		expect(elementsToBeSorted.sort()).to.have.ordered.members(elements)
	} else {
		console.log(elementsToBeSorted.sort(), elements)
		expect(elementsToBeSorted.sort()).not.to.have.ordered.members(elements)
	}
};