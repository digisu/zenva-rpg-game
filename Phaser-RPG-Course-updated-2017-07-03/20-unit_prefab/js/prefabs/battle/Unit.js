var RPG = RPG || {};

RPG.Unit = function (game_state, name, position, properties) {
    "use strict";
    var attack1_animation, attack2_animation, hit_animation;
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.animations.add("idle", properties.animations.idle.frames, properties.animations.idle.fps, true);
    attack1_animation = this.animations.add("attack1", properties.animations.attack1.frames, properties.animations.attack1.fps);
    attack1_animation.onComplete.add(this.back_to_idle, this);
    attack2_animation = this.animations.add("attack2", properties.animations.attack2.frames, properties.animations.attack2.fps);
    attack2_animation.onComplete.add(this.back_to_idle, this);
    hit_animation = this.animations.add("hit", properties.animations.hit.frames, properties.animations.hit.fps);
    hit_animation.onComplete.add(this.back_to_idle, this);
    
    this.animations.play("idle");
    
    this.stats = properties.stats;
};

RPG.Unit.prototype = Object.create(RPG.Prefab.prototype);
RPG.Unit.prototype.constructor = RPG.Unit;

RPG.Unit.prototype.back_to_idle = function () {
    "use strict";
    this.animations.play("idle");
};