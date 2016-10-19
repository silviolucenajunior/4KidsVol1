//  A custom particle used on PaintState
PaintParticle = function (game, x, y) {

    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('paintParticleShade'));
};

PaintParticle.prototype = Object.create(Phaser.Particle.prototype);
PaintParticle.prototype.constructor = PaintParticle;
PaintParticle.prototype.onEmit = function(){
    console.log("Particle Emited");
    this.loadTexture("particle");
    this.tint = Math.random() * 0xffffff;
}