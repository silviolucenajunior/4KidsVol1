function StateGameBubble() {
    this.square = null;
    this.circle = null;
    this.triangle = null;
    this.bubbles = [];
};

StateGameBubble.prototype = {
    constructor: StateGameBubble,
    preload: function(){
        game.load.image('bubble', '/phaser/assets/bubble.png');
        game.load.spritesheet('bubble_sheet', '/phaser/assets/bubble_spritesheet.png', 218, 188);
        game.load.audio('pop', ['/phaser/assets/pop.mp3']);
    },
    create: function(){
        //var bubble = this.game.add.sprite(0, 0, 'bubble');
        //bubble.scale.setTo(0.5, 0.5);
        game.time.events.repeat(Phaser.Timer.SECOND / 3, 100, function(){
            var bubble = new GameBubble();
            this.bubbles.push(bubble);
        }, this);
        
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
        for (var i = 0, count = this.bubbles.length; i < count; i++){
            this.bubbles[i].update();
        }
       //this.bubble.update();
    },

    onDragStop: function(){
        console.log("Drag Stop");
    },
};