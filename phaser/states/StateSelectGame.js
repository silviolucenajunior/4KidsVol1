//#globals game
"use strict"

function StateSelectGame(){
   this.buttonA = undefined;
   this.buttonB = undefined;
   this.buttonC = undefined;
   this.buttonD = undefined;
}

StateSelectGame.prototype = {
	constructor: StateSelectGame,
	preload: function(){
        game.load.image('buttonA', '/phaser/assets/buttonA.png');
	},
	create: function(){
		this.buttonA = game.add.sprite(20, 30, 'buttonA');
		this.buttonB = game.add.sprite(200, 30, 'buttonA');
		this.buttonC = game.add.sprite(20, 230, 'buttonA');
		this.buttonD = game.add.sprite(200, 230, 'buttonA');

		this.buttonA.inputEnabled = true;
		this.buttonB.inputEnabled = true;
		this.buttonC.inputEnabled = true;
		this.buttonD.inputEnabled = true;
		
		this.buttonA.events.onInputDown.add(function(){
			game.state.start('StateGameShapes');
		}, this);
		this.buttonB.events.onInputDown.add(function(){
			game.state.start('StateGameBubble');
		}, this);
		this.buttonC.events.onInputDown.add(function(){
			game.state.start('StateGamePaint');
		}, this);
		this.buttonD.events.onInputDown.add(function(){
			//game.state.start('StateGameShapes');
		}, this);


	},
	update: function(){}
};