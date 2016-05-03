function GameBubble(){
    this.sprite = null;
    this.distance = 30;
    this.originalX = undefined;
    this.direction = 1;
    this.create();
};

GameBubble.prototype = {
    constructor: GameBubble,
    preload: function(){
        /*this.game.load.image('squareShape', '/phaser/assets/Square.png');
        this.game.load.image('triangleShape', '/phaser/assets/Triangle.png');
        this.game.load.image('circleShape', '/phaser/assets/Circle.png');*/
    },
    create: function(){
        this.originalX = game.world.randomX;
        this.sprite = game.add.sprite(this.originalX, 600, 'bubble');
        this.sprite.scale.setTo(0.3, 0.3);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.onTap, this);
        //this.sprite.input.onTap.add(this.onTap, this);
    },
    update: function(){
        this.sprite.y -= 1;
        if (Math.abs(this.sprite.x - this.originalX) > this.distance){
            this.direction *= -1;
        }
        this.sprite.x += this.direction * 2;
    },
    onTap: function(){
        this.sprite.destroy();
        console.log("Tap on Bubble");
    }
};