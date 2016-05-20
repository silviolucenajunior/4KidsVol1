"use strict"
function StateIntro(){}

StateIntro.prototype = {
	constructor: StateIntro,
	preload: function(){},
	create: function(){
		game.add.text(10, 10, "Intro with some credits", {fill: "#fff", font: '24px Arial'});
		game.add.text(10, 60, "Press enter to go to tittle screen", {fill: "#fff", font: '24px Arial'});
		game.input.onDown.addOnce(function(){
			game.state.start("StateSelectGame");
		});
	},
	update: function(){}
};