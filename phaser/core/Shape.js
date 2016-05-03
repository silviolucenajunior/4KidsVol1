function GameShape(shape, dropArea){
    this.shape = shape;
    this.dropArea = {
        x: 200,
        width: 100
    };
    this.sprite = null;
};

GameShape.prototype = {
    constructor: GameShape,
    preload: function(){
        /*this.game.load.image('squareShape', '/phaser/assets/Square.png');
        this.game.load.image('triangleShape', '/phaser/assets/Triangle.png');
        this.game.load.image('circleShape', '/phaser/assets/Circle.png');*/
    },
    create: function(){
        this.sprite = game.add.sprite(10, 10, this.shape);
        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag(true);
        this.sprite.events.onDragStop.add(this.onDragStop, this);
    },
    update: function(){},
    onDragStop: function(sprite, pointer){
        console.log("Dropponmg");
        if (pointer.x > this.dropArea.x && pointer.x < (this.dropArea.x + this.dropArea.width)){
            this.sprite.input.enableDrag(false);
            this.sprite.inputEnabled = false;
            console.log("Drop in AREA!!!")
        }
    }
};