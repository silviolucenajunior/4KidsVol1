function StateGamePaint() {
    this.bitmapdata = undefined;
    this.colors = undefined;
    this.actualColor = 0;
    this.lines = [[]];
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
        this.bitmapdata = game.add.bitmapData(game.scale.width, game.scale.height);
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
        for (var line = 0, linesCount = this.lines.length; line < linesCount; line++){
            for (var i = 0, count = this.lines[line].length; i < count; i++){
                this.lines[line][i].lifeTime -= 3;
                this.drawLine(i > 0 ? this.lines[line][i-1] : this.lines[line][i], this.lines[line][i]);
            }
        }
    },
    drawLine: function(fromPoint, toPoint){
        var alphaValue = toPoint.lifeTime / 100 * 100 / 100;
        alphaValue = alphaValue < 0 ? 0 : alphaValue;
        this.bitmapdata.ctx.strokeStyle = "rgba(" + toPoint.color.r +", " + toPoint.color.g +", " + toPoint.color.b +", " + alphaValue +")";
        //this.bitmapdata.ctx.strokeStyle = "white";
        this.bitmapdata.ctx.lineJoin = "round";
        this.bitmapdata.ctx.lineCap = "round";
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
        console.log(this.lines);
    },
    disableParticleEmitter: function(pointer) {
        this.particleEmitter.on = false;
        console.log("Disable Particle Emitter");
        this.lines.push([]);
    },
    paint: function(pointer, x, y){
        this.particleEmitter.emitX = x;
        this.particleEmitter.emitY = y;
        //this.particleEmitter.x = x;
        //this.particleEmitter.y = y;
        if (pointer.isDown){
            console.log(this.lines);
            console.log(this.lines.length);
            this.lines[this.lines.length - 1].push({
                x: x,
                y: y,
                lifeTime: 300,
                color: this.colors[this.actualColor]
            });
            //this.bitmapdata.circle(x, y, 2, this.colors[this.actualColor].rgba);
            this.actualColor = game.math.wrapValue(this.actualColor, 1, 359);
        }
    }
};
