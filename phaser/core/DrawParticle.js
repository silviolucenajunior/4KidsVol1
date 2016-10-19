//  A custom particle used on PaintState
function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}



PaintParticle = function (game, x, y) {

    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('paintParticleShade'));
};

PaintParticle.prototype = Object.create(Phaser.Particle.prototype);
PaintParticle.prototype.constructor = PaintParticle;
PaintParticle.prototype.onEmit = function(){
    console.log("Particle Emited + " + rgbToHex(window.actualColor.r, window.actualColor.g, window.actualColor.b));
    this.loadTexture("particle");
    console.log(window.actualColor);
    this.tint = "0x" + rgbToHex(window.actualColor.r, window.actualColor.g, window.actualColor.b);
    //this.tint = window.actualColor.r + window.actualColor.r + window.actualColor.b || Math.random() * 0xffffff;
    //this.tint = Math.random() * 0xffffff;
}