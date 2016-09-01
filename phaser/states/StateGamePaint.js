function StateGamePaint() {
    this.bitmapdata = undefined;
    this.colors = undefined;
    this.actualColor = 0;
    this.points = [];
    this.particleEmitter = null;
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
        this.particleEmitter.gravity = 200;
        this.particleEmitter.start(false, 1000, 20);
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
        this.bitmapdata.clear();
        this._drawPointsAsLine();
    },
    _drawPointsAsLine: function(){
        for (var i = 0, count = this.points.length; i < count; i++){
            this.points[i].lifeTime -= 1;
            this.drawLine(i > 0 ? this.points[i-1] : this.points[i], this.points[i]);
        }
    },
    drawLine: function(fromPoint, toPoint){
        this.bitmapdata.ctx.strokeStyle = "white";
        this.bitmapdata.ctx.beginPath();
        this.bitmapdata.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.bitmapdata.ctx.lineTo(toPoint.x, toPoint.y);
        this.bitmapdata.ctx.lineWidth = 3;
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
                lifeTime: 1000
            });
            //this.bitmapdata.circle(x, y, 2, this.colors[this.actualColor].rgba);
            //this.actualColor = game.math.wrapValue(this.actualColor, 1, 359);
        }
    }
};
