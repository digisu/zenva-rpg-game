var RPG = RPG || {};

RPG.EnemyUnit = function (game_state, name, position, properties) {
    "use strict";
    var attack1_animation, attack2_animation, hit_animation;
    RPG.Unit.call(this, game_state, name, position, properties);
    
    this.attack = new RPG.Attack(this.game_state, this.name + "_attack", {x: 0, y: 0}, {group: "attacks", owner: this});
};

RPG.EnemyUnit.prototype = Object.create(RPG.Unit.prototype);
RPG.EnemyUnit.prototype.constructor = RPG.EnemyUnit;

RPG.EnemyUnit.prototype.act = function () {
    "use strict";
    var target;
    
    target = this.choose_target();
    
    this.attack.hit(target);
};

RPG.EnemyUnit.prototype.choose_target = function () {
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