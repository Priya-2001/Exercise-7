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