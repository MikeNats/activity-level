module.exports = (order, option) => {

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


	var elements = browser.elements('.list-item .' + option + '-item').getText();


	elements = elements.map((ele) => {
		return +ele.replace(option +': ', '');
	}).map(el => +el);

	console.log(elements);

    expect(elements.isSorted()).to.be.true;
 
};