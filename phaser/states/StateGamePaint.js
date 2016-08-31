function StateGamePaint() {
    this.bitmapdata = undefined;
    this.colors = undefined;
    this.actualColor = 0;
    this.explosions = [];
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
        this.particleEmitter.start(false, 2000, 20);
    },
    create: function(){
        this._startParticleEmitter();
        this.colors = Phaser.Color.HSVColorWheel();
        this.bitmapdata = game.add.bitmapData(800, 600);
        game.add.sprite(0, 0, this.bitmapdata);
        game.input.addMoveCallback(this.paint, this);
        game.input.onTap.add(this.addExplosion, this);
        game.input.onDown.add(this.enableParticleEmitter, this);
        game.input.onUp.add(this.disableParticleEmitter, this);
    },
    update: function(){
    },
    enableParticleEmitter: function(point){
        console.log("Enable Particle Emitter");
    },
    disableParticleEmitter: function(pointer) {
        console.log("Disable Particle Emitter");
    },
    addExplosion: function(point, x, y){
        console.log("Add New Explosion at " + x + "< " + y);
    },
    paint: function(pointer, x, y){
        this.particleEmitter.emitX = x;
        this.particleEmitter.emitY = y;
        //this.particleEmitter.x = x;
        //this.particleEmitter.y = y;
        if (pointer.isDown){
            this.bitmapdata.circle(x, y, 16, this.colors[this.actualColor].rgba);
            this.actualColor = game.math.wrapValue(this.actualColor, 1, 359);
        }
    }
};
