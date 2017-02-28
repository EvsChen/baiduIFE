/*
* @Author: EvsChen
* @Date:   2017-02-27 13:12:16
* @Last Modified by:   EvsChen
* @Last Modified time: 2017-02-27 14:42:17
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
	 
}