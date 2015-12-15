
var isOperator = require("./isoperator");
var calcScreen = require("./calcdisplay").calcScreen;

//calculates the value of the array after the user has clicked the equal operator
module.exports = function(argArray){
	//creates array of operators
	var opArray = argArray.filter(isOperator);
	//created array of user chosen numbers
	var numbArray = argArray.filter(function(val){
		if(!isNaN(parseFloat(val)) ){
			return true
		}; 
		return false; 
	});

	//performs calcualtions using switch and casses
	var total = numbArray.reduce(function(a,b){
		//access teh operator to identify which calculation needs to take place
		var operator = opArray.shift();
		//determines if a number is a percentage and converts the number to a floating point number
		if (b.indexOf("%") !== -1 ){
			b = a * (parseFloat(b) / 100) ;
		}
		//converts the text strings to Numbers
		a = parseFloat(a);
		b = parseFloat(b);

		switch (operator){
			case "x":
				return a * b;
				break;
			case "/":
				return a/b;
				break;
			case "+":
				return a + b;
				break;
			case "-":
				return a - b;

		}
	});
	//returns the reduced total
	return total;




}