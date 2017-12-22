var RPG = RPG || {};

RPG.Attack = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.owner = properties.owner;
};

RPG.Attack.prototype = Object.create(RPG.Prefab.prototype);
RPG.Attack.prototype.constructor = RPG.Attack;

RPG.Attack.prototype.hit = function (target) {
    "use strict";
    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    
    var attack_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    var defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    
    var damage = Math.max(0, Math.round((attack_multiplier * this.owner.stats.attack) - (defense_multiplier * target.stats.defense)));
    
    target.receive_damage(damage);
    
    this.owner.animations.play("attack1");
    this.owner.animations.currentAnim.onComplete.add(this.game_state.next_turn, this.game_state);
};