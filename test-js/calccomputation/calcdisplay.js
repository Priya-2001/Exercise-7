
var isOperator  = require('./isoperator');
var evaluate = require("./evaluate");
//creaes variable which references the calculator screen element
var calcScreen = document.querySelector("#calc-screen");
//outputArray holds the user-chosen numbers and operators as strings
var outputArray = [];

module.exports.calcScreen = calcScreen;

//display function identifies which button was clicked and how to change the calculator display and pass along user-chosen inputs to outputArray
module.exports.display = function(output){
	//references the calculator screen inner-html
	var calcScreenDisplay = calcScreen.innerHTML;
	//references the last element in the output array
	var lastOutArrayElement = outputArray[outputArray.length -1];

	//determines whether the "=" operator was clicked and whether the calculator display contains a number
	if(output === "=" && !isNaN(parseFloat(calcScreenDisplay)) ){
		//pushed the calculator display balue to the outputArray, then calculates and displays the total
		outputArray.push(calcScreenDisplay);
		var total = evaluate(outputArray);
		calcScreen.innerHTML = total;
		//resets outputArray
		outputArray = [];
		return;
	}

	//determines whether the user clicked operator and whether the calculator display contains a number
	if(isOperator(output) && !isNaN(isOperator(calcScreenDisplay)) ) {
		//determines whether the calculator screen inner html contains a number add the outputArray and display the number
		if( !isNaN(parseFloat(calcScreenDisplay)) ){
			outputArray.push(calcScreenDisplay);
			calcScreen.innerHTML = output;
			return;
		}
		
		//determines whether the calculator screen is empty and  if the last element in the outputArray is a number
		if(calcScreenDisplay === "" && !isNaN(parseFloat(lastOutArrayElement)) ){
			calcScreen.innerHTML = output;
		}
	}

	//determines whether the user chosen input is a "%" operator and whether the calcualtor and outputArray match the required criteria
	if(output === "%" && !isNaN(parseFloat(calcScreenDisplay)) && calcScreenDisplay.indexOf("%") === -1 && isOperator(lastOutArrayElement) ){
		calcScreen.innerHTML += output;
		return;
	}
	//determines whether the user chosen input is a number or decimal point
	if( !isNaN(parseFloat(output)) || output === "."){
		var conDec = calcScreenDisplay.indexOf(".");
		//determines whether the calculator screen inner html contains a decimal point
		if( output === "." && conDec !== -1){
			return;
		}

		//determines whether the calculator screen inner html contains a operator
		if(isOperator(calcScreenDisplay)){
			outputArray.push(calcScreenDisplay);
			calcScreen.innerHTML = "";
		}

		//determines whether the calculator screen and outputArray match the required criteria to add the number to the Calculator screen
		if( (calcScreen.innerHTML === "" || !isNaN(parseFloat(calcScreenDisplay)) || calcScreen.innerHTML === "." ) && (outputArray[0] === undefined || isOperator(outputArray[outputArray.length -1]) )  ) {
			calcScreen.innerHTML += output; 

		}
		
	}


};

//clear funciton identifies which type of button was clicked and how to interact with the out outputArray and calcScreen
module.exports.clear = function(output){
	//determines whether the CE button was clicked and if true proceeds to clear the calculator screen inner html
	if(output === "CE" ){
		calcScreen.innerHTML = "";
		return;
	}
	//determines whether the AC button was clicked and if true proceeds to clear the calculator screen inner html and outputArray
	if(output === "AC"){
		calcScreen.innerHTML = "";
	    outputArray = [];

		
	}
};