function StateGamePaint() {
    this.bitmapdata = undefined;
    this.colors = undefined;
    this.actualColor = 0;
    this.points = [];
    this.particleEmitter = null;
    this.timeLine = 1000;
};

StateGamePaint.prototype = {
    constructor: StateGamePaint,
    preload: function(){
        game.load.image('bubble', '/phaser/assets/bubble.png');
        game.load.image('particle', '/phaser/assets/purpledot.gif');
    },
    _startParticleEmitter: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.particleEmitter = game.add.emitter(50, 50, 100);
        this.particleEmitter.makeParticles('particle');
        this.particleEmitter.gravity = 100;
        this.particleEmitter.setAlpha(1,0, 600);
        this.particleEmitter.setScale(1, 0, 1, 0, 600)
        this.particleEmitter.start(false, 600, 13);
        this.particleEmitter.on = false;
    },
    create: function(){
        this._startParticleEmitter();
        this.colors = Phaser.Color.HSVColorWheel();
        this.bitmapdata = game.add.bitmapData(800, 600);
        game.add.sprite(0, 0, this.bitmapdata);
        game.input.onDown.add(this.enableParticleEmitter, this);
        game.input.onUp.add(this.disableParticleEmitter, this);
        game.input.addMoveCallback(this.paint, this);
    },
    update: function(){
        this.timeLine -= 1;
        this.bitmapdata.clear();
        this._drawPointsAsLine();
    },
    _drawPointsAsLine: function(){
        for (var i = 0, count = this.points.length; i < count; i++){
            this.points[i].lifeTime -= 3;
            this.drawLine(i > 0 ? this.points[i-1] : this.points[i], this.points[i]);
        }
    },
    drawLine: function(fromPoint, toPoint){
        var alphaValue = toPoint.lifeTime / 100 * 100 / 100;
        alphaValue = alphaValue < 0 ? 0 : alphaValue;
        this.bitmapdata.ctx.strokeStyle = "rgba(" + this.colors[this.actualColor].r +", " + this.colors[this.actualColor].g +", " + this.colors[this.actualColor].b +", " + alphaValue +")";
        //this.bitmapdata.ctx.strokeStyle = "white";
        this.bitmapdata.ctx.beginPath();
        this.bitmapdata.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.bitmapdata.ctx.lineTo(toPoint.x, toPoint.y);
        this.bitmapdata.ctx.lineWidth = 8;
        this.bitmapdata.ctx.stroke();
        this.bitmapdata.ctx.closePath();
        this.bitmapdata.render();
        //this.bitmapdata.refreshBuffer();
    },
    enableParticleEmitter: function(point){
        this.particleEmitter.on = true;
        console.log("Enable Particle Emitter");
    },
    disableParticleEmitter: function(pointer) {
        this.particleEmitter.on = false;
        console.log("Disable Particle Emitter");
    },
    paint: function(pointer, x, y){
        this.particleEmitter.emitX = x;
        this.particleEmitter.emitY = y;
        //this.particleEmitter.x = x;
        //this.particleEmitter.y = y;
        if (pointer.isDown){
            this.points.push({
                x: x,
                y: y,
                lifeTime: 300
            });
            //this.bitmapdata.circle(x, y, 2, this.colors[this.actualColor].rgba);
            this.actualColor = game.math.wrapValue(this.actualColor, 1, 359);
        }
    }
};
