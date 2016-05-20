function GameBubble(){
    this.sprite = null;
    this.animation = undefined;
    this.distance = 30;
    this.originalX = undefined;
    this.direction = 1;
    this.sfx = undefined;
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
        this.sprite = game.add.sprite(this.originalX, 600, 'bubble_sheet');
        this.sfx = game.add.audio('pop');
        this.animation = this.sprite.animations.add("explode", [1, 2, 3, 4, 5], 20, false);
        this.animation.onComplete.add(function(){
            this.sprite.destroy();
        }, this);
        this.sprite.frame = 0;
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
        //this.sprite.destroy();
        this.sprite.animations.play("explode");
        this.sfx.play();
        console.log("Tap on Bubble");
    }
};