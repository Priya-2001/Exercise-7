(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//function adds and removes class to rotate the calculator
module.exports =function(event){
	//references the element clicked, calcualtor-container ,and calculator-container classList
	var mfcButton = event.target;
	var calcContainer = document.querySelector(".calculator-container");
	var calcClasses = document.querySelector(".calculator-container").classList;
	//determines whether the calculator has been rotated to the left
	if(calcClasses.contains("rotate-left") === true){
		calcClasses.remove("rotate-left");
		calcClasses.add("rotate-right");
		//changes the inner html of the button clicked
		mfcButton.innerHTML = "View Manufacturer Info";
		return;
	}
	//determines whether the calculator has been rotated to the right
	if(calcClasses.contains("rotate-left")  === false){
		//determines whether the rotate-right class exists
		if(calcClasses.contains("rotate-right")){
			calcClasses.remove("rotate-right");
		}
		calcClasses.add("rotate-left");
		//changes the inner html of the button clicked
		mfcButton.innerHTML = "Go Back";
	};
}

	
},{}],2:[function(require,module,exports){
var buttonpress = require('./calccomputation/buttonpress');
var rotatecalc = require('./animation/calcanimation');

//buttonConatiner references the calculator button contianer
var buttonContainer = document.querySelector("#button-container");
//animateButton refernces the button which allows the user to rotate the container
var animateButton = document.querySelector("#mfc-btn");

//adds event listener to listen for users attempting to interact with calculator buttons
buttonContainer.addEventListener("click",buttonpress,false);
//adds event listener to listen for users attempting to rotate the calculator
animateButton.addEventListener("click",rotatecalc,false);

},{"./animation/calcanimation":1,"./calccomputation/buttonpress":3}],3:[function(require,module,exports){
var calc = require("./calcdisplay");
var evaluate = require("./evaluate");

//function determines if a button from the calculator was pressed and the appropriate function to call
module.exports = function (event){
		var eventTag = event.target.tagName;
		var target = event.target;
		//determines whether a button element was clicked
		if( eventTag === "BUTTON"){
			var targetOutput =  target.innerHTML;
			//determines whether a clear button was clicked and then calls the clear function
			if(targetOutput === "AC" || targetOutput ==="CE"){
				return calc.clear(targetOutput);
			}
			//if a button was clicked which was a number or operator then calls the display function
			calc.display(targetOutput);
		}
		
};
},{"./calcdisplay":4,"./evaluate":5}],4:[function(require,module,exports){

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
},{"./evaluate":5,"./isoperator":6}],5:[function(require,module,exports){

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
},{"./calcdisplay":4,"./isoperator":6}],6:[function(require,module,exports){
//determines whether the argument contains a operator
module.exports = function(text){
	var targetArray = ["/","x","+","-"];
	if(targetArray.indexOf(text)!== -1){
		return true;
	}
	return false;
};
},{}]},{},[2])


//# sourceMappingURL=app.js.map
