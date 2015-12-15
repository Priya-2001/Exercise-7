//determines whether the argument contains a operator
module.exports = function(text){
	var targetArray = ["/","x","+","-"];
	if(targetArray.indexOf(text)!== -1){
		return true;
	}
	return false;
};