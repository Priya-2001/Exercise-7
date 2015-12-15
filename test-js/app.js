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
