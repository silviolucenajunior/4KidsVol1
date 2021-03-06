function StateGamePaint() {
    this.bitmapdata = undefined;
    this.colors = undefined;
    this.actualColor = 0;
    this.lines = [[]];
    this.particleEmitter = null;
    this.timeLine = 1000;
    this.minDistance = 25;
    this.clearDelay = 100;
};

StateGamePaint.prototype = {
    constructor: StateGamePaint,
    preload: function(){
        game.load.image('bubble', '/phaser/assets/bubble.png');
        game.load.image('particle', '/phaser/assets/purpledot.gif');
        game.load.audio('background_music', '/phaser/assets/amclassical_beethoven_fur_elise.mp3');
    },
    _startParticleEmitter: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.particleEmitter = game.add.emitter(150, 150, 100);
        this.particleEmitter.particleClass = PaintParticle;
        this.particleEmitter.makeParticles('particle');
        this.particleEmitter.gravity = 100;
        this.particleEmitter.setAlpha(1.5, 0.5, 1000);
        this.particleEmitter.setScale(2.5, 0.5, 2.0, 0.5, 1200)
        this.particleEmitter.start(false, 700, 33);
        this.particleEmitter.on = false;
    },
    create: function(){
        this._startParticleEmitter();
        this.colors = Phaser.Color.HSVColorWheel();
        this.bitmapdata = game.add.bitmapData(game.scale.width, game.scale.height);
        game.add.sprite(0, 0, this.bitmapdata);
        window.music = game.add.audio('background_music');
        music.volume = 0.025;
        music.play();
        music.loopFull();
        game.input.onDown.add(this.enableParticleEmitter, this);
        game.input.onUp.add(this.disableParticleEmitter, this);
        game.input.addMoveCallback(this.paint, this);
    },
    update: function(){
        this.clearDelay -= 25;
        if (this.clearDelay <= 0) {
            console.log("Clear");
            this.bitmapdata.clear();
            this.clearDelay = 100;
        }
        this.timeLine -= 1;

        this._drawPointsAsLine();
    },
    _drawPointsAsLine: function(){
        for (var line = 0, linesCount = this.lines.length; line < linesCount; line++){
            for (var i = 0, count = this.lines[line].length; i < count; i++){
                if (this.lines[line][i].lifeTime > 0) {
                    this.lines[line][i].lifeTime -= 3;
                    this.drawLine(i > 0 ? this.lines[line][i-1] : this.lines[line][i], this.lines[line][i]);
                }
            }
        }
        this.bitmapdata.render();
    },
    drawLine: function(fromPoint, toPoint){
        var alphaValue = toPoint.lifeTime / 100 * 100 / 100;
        alphaValue = alphaValue < 0 ? 0 : alphaValue;

//DRAW BLUR
        // this.bitmapdata.ctx.strokeStyle = "rgba(" + toPoint.color.r +", " + toPoint.color.g +", " + toPoint.color.b +", 0.1)";
        // this.bitmapdata.ctx.beginPath();
        // this.bitmapdata.ctx.moveTo(fromPoint.x, fromPoint.y);
        // this.bitmapdata.ctx.lineTo(toPoint.x, toPoint.y);
        // this.bitmapdata.ctx.lineWidth = 30;
        // this.bitmapdata.ctx.stroke();
        // this.bitmapdata.ctx.closePath();

        // this.bitmapdata.ctx.strokeStyle = "rgba(" + toPoint.color.r +", " + toPoint.color.g +", " + toPoint.color.b +", 0.2)";
        // this.bitmapdata.ctx.beginPath();
        // this.bitmapdata.ctx.moveTo(fromPoint.x, fromPoint.y);
        // this.bitmapdata.ctx.lineTo(toPoint.x, toPoint.y);
        // this.bitmapdata.ctx.lineWidth = 28;
        // this.bitmapdata.ctx.stroke();
        // this.bitmapdata.ctx.closePath();

        // this.bitmapdata.ctx.strokeStyle = "rgba(" + toPoint.color.r +", " + toPoint.color.g +", " + toPoint.color.b +", 0.3)";
        // this.bitmapdata.ctx.beginPath();
        // this.bitmapdata.ctx.moveTo(fromPoint.x, fromPoint.y);
        // this.bitmapdata.ctx.lineTo(toPoint.x, toPoint.y);
        // this.bitmapdata.ctx.lineWidth = 24;
        // this.bitmapdata.ctx.stroke();
        // this.bitmapdata.ctx.closePath();

        

        




        //Draw LINE


        this.bitmapdata.ctx.strokeStyle = "rgba(" + toPoint.color.r +", " + toPoint.color.g +", " + toPoint.color.b +", " + alphaValue +")";
        //this.bitmapdata.ctx.strokeStyle = "white";
        this.bitmapdata.ctx.lineJoin = "round";
        this.bitmapdata.ctx.lineCap = "round";
        this.bitmapdata.ctx.shadowBlur = 20;
        this.bitmapdata.ctx.shadowColor = "rgba(" + toPoint.color.r +", " + toPoint.color.g +", " + toPoint.color.b +", " + alphaValue +")";
        this.bitmapdata.ctx.beginPath();
        this.bitmapdata.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.bitmapdata.ctx.lineTo(toPoint.x, toPoint.y);
        this.bitmapdata.ctx.lineWidth = 16;
        this.bitmapdata.ctx.stroke();
        this.bitmapdata.ctx.closePath();

       /* this.bitmapdata.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        this.bitmapdata.ctx.beginPath();
        this.bitmapdata.ctx.moveTo(fromPoint.x, fromPoint.y);
        this.bitmapdata.ctx.lineTo(toPoint.x, toPoint.y);
        this.bitmapdata.ctx.lineWidth = 2;
        this.bitmapdata.ctx.stroke();
        this.bitmapdata.ctx.closePath();*/
        //this.bitmapdata.render();
        //this.bitmapdata.refreshBuffer();
        //
        
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

    getLastPointOfCurrentLine: function(){
        return this.lines[this.lines.length - 1][this.lines[this.lines.length - 1].length - 1];
    },
    hasMinDistance: function(x1, y1, x2, y2, minDistance){
        var distance = Math.sqrt( Math.pow( x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return distance > minDistance;
    },
    paint: function(pointer, x, y){
        this.particleEmitter.emitX = x;
        this.particleEmitter.emitY = y;
        //this.particleEmitter.x = x;
        //this.particleEmitter.y = y;
        if (pointer.isDown){
            var lastPoint = this.getLastPointOfCurrentLine();

            if (!lastPoint) {
                this.lines[this.lines.length - 1].push({
                    x: x,
                    y: y,
                    lifeTime: 300,
                    color: this.colors[this.actualColor]
                });
                //this.bitmapdata.circle(x, y, 2, this.colors[this.actualColor].rgba);
                this.actualColor = game.math.wrapValue(this.actualColor, 3, 359);
            }else if (this.hasMinDistance(lastPoint.x, lastPoint.y, x, y, this.minDistance)) {
                this.lines[this.lines.length - 1].push({
                    x: x,
                    y: y,
                    lifeTime: 300,
                    color: this.colors[this.actualColor]
                });
                //this.bitmapdata.circle(x, y, 2, this.colors[this.actualColor].rgba);
                this.actualColor = game.math.wrapValue(this.actualColor, 3, 359);
            } else {
            }
        }

        window.actualColor = this.colors[this.actualColor];
    }
};
