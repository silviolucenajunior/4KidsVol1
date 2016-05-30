var game = new Phaser.Game(540, 960, Phaser.CANVAS, 'game');
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
