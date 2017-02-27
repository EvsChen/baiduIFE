/*
* @Author: EvsChen
* @Date:   2017-02-27 13:12:16
* @Last Modified by:   EvsChen
* @Last Modified time: 2017-02-27 13:59:01
*/

'use strict';

function inputCheck() {
	var input = document.getElementById("inputBox").value;
	var l = 0; 
	for (let i = 0; i < input.length; i++){
		if (input.charCodeAt(i) >= 0 && input.charCodeAt(i) <= 128){
			l++;
		}
		else {
			l += 2;
		}
	}
	console.log(l);
	var promptCont = document.getElementById("prompt");
	var inputBox = document.getElementById("inputBox");
	if (l === 0) {
		promptCont.textContent = "Name cannot be empty";
		promptCont.style.color = "red"; 
		inputBox.style.borderColor = "red";
	}
	else if (l < 4) {
		promptCont.textContent = "Name is too short";
		promptCont.style.color = "red"; 	
		inputBox.style.borderColor = "red";
	}
	else if (l > 16){
		promptCont.textContent = "Name is too long";
		promptCont.style.color = "red"; 
		inputBox.style.borderColor = "red";
	}
	else {
		promptCont.textContent = "Name can be used";
		promptCont.style.color = "green"; 
		inputBox.style.borderColor = "green";	
	}
}