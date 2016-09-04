var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'game', {
    preload: function(){
        console.log("PRELOAD");
    },
    init: function(){
        console.log("INIT");
        //game.scale.maxWidth = 800;
        //game.scale.maxHeight = 600;
        if (!game.device.desktop) {
            document.querySelector("#game")
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
    },
    create: function(){
        console.log("CREATE")
        _stateGameShapes = new StateGameShapes();
        _stateGameBubble = new StateGameBubble();
        _stateGamePaint = new StateGamePaint();
        _stateSelectGame = new StateSelectGame();
        _stateIntro = new StateIntro();
        game.state.add('StateGameShapes', _stateGameShapes);
        game.state.add('StateGameBubble', _stateGameBubble);
        game.state.add('StateGamePaint', _stateGamePaint);
        game.state.add('StateSelectGame', _stateSelectGame);
        game.state.add('StateIntro', _stateIntro);
        game.state.start('StateIntro');
    }
});

//Check device is running the game and change scale.

console.log("Devis is ");
console.log(game.device);

