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
    this.target_units = properties.target_units;
};

RPG.Unit.prototype = Object.create(RPG.Prefab.prototype);
RPG.Unit.prototype.constructor = RPG.Unit;

RPG.Unit.prototype.back_to_idle = function () {
    "use strict";
    this.animations.play("idle");
};

RPG.Unit.prototype.receive_damage = function (damage) {
    "use strict";
    var damage_text, kill_timer;
    
    this.stats.health -= damage;
    this.animations.play("hit");
    if (this.stats.health <= 0) {
        this.stats.health = 0;
        this.kill();
    }
    
    damage_text = this.game_state.game.add.text(this.x, this.y - 50, "" + damage, {font: "bold 24px Kells", fill: "#FF0000"}, this.game_state.groups.hud);
    kill_timer = this.game_state.time.create();
    kill_timer.add(1 * Phaser.Timer.SECOND, damage_text.kill, damage_text);
    kill_timer.start();
};

RPG.Unit.prototype.act = function () {
    "use strict";
    var target;
    
    target = this.choose_target();
    
    var attack_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    var defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    
    var damage = Math.max(0, Math.round((attack_multiplier * this.stats.attack) - (defense_multiplier * target.stats.defense)));
    
    target.receive_damage(damage);
    
    this.animations.play("attack1");
};

RPG.Unit.prototype.choose_target = function () {
    "use strict";
    var target_index, target, player_unit_index, alive_player_unit_index;
    target_index = this.game_state.rnd.between(0, this.game_state.groups[this.target_units].countLiving() - 1);
    alive_player_unit_index = 0;
    this.game_state.groups[this.target_units].forEachAlive(function (alive_unit) {
        if (alive_player_unit_index === target_index) {
            target = alive_unit;
        }
        alive_player_unit_index += 1;
    }, this);
    return target;
};