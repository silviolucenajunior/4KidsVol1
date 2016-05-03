var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
_stateGameShapes = new StateGameShapes();
_stateGameBubble = new StateGameBubble();
_stateGamePaint = new StateGamePaint();
game.state.add('StateGameShapes', _stateGameShapes);
game.state.add('StateGameBubble', _stateGameBubble);
game.state.add('StateGamePaint', _stateGamePaint);
game.state.start('StateGamePaint');