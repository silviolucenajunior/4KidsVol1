function StateGameShapes() {
    this.square = null;
    this.circle = null;
    this.triangle = null;
};

StateGameShapes.prototype = {
    constructor: StateGameShapes,
    preload: function(){
        game.load.image('background1', '/phaser/assets/background1.png');
        game.load.image('squareShape', '/phaser/assets/Square.png');
        game.load.image('triangleShape', '/phaser/assets/Triangle.png');
        game.load.image('circleShape', '/phaser/assets/Circle.png');
    },
    create: function(){
        this.game.add.sprite(0,0,'background1');
        var shape1 = new GameShape('squareShape');
        var shape2 = new GameShape('circleShape');
        var shape3 = new GameShape('triangleShape');
        shape1.create();
        shape2.create();
        shape3.create();
        /*this.square = this.game.add.sprite(10, 10, 'squareShape');
        this.triangle = this.game.add.sprite(10, 100, 'triangleShape');
        this.circle = this.game.add.sprite(100, 10, 'circleShape');

        this.square.inputEnabled = true;
        this.triangle.inputEnabled = true;
        this.circle.inputEnabled = true;

        this.square.input.enableDrag(true);
        this.triangle.input.enableDrag(true);
        this.circle.input.enableDrag(true);

        this.square.events.onDragStop.add(this.onDragStop, this);*/
    },
    update: function(){

    },

    onDragStop: function(){
        console.log("Drag Stop");
    },
};