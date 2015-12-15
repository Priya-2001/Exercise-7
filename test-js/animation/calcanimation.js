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

	