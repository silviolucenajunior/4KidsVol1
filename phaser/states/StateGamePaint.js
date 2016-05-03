function StateGamePaint() {
    this.bitmapdata = undefined;
    this.colors = undefined;
    this.actualColor = 0;
};

StateGamePaint.prototype = {
    constructor: StateGamePaint,
    preload: function(){
    },
    create: function(){
        this.colors = Phaser.Color.HSVColorWheel();
        this.bitmapdata = game.add.bitmapData(800, 600);
        game.add.sprite(0, 0, this.bitmapdata);
        game.input.addMoveCallback(this.paint, this);

    },
    update: function(){
    },
    paint: function(pointer, x, y){
        if (pointer.isDown){
            this.bitmapdata.circle(x, y, 16, this.colors[this.actualColor].rgba);
            this.actualColor = game.math.wrapValue(this.actualColor, 1, 359);
        }
    }
};