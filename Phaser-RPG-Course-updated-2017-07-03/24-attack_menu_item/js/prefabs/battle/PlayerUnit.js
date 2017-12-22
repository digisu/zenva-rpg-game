var RPG = RPG || {};

RPG.PlayerUnit = function (game_state, name, position, properties) {
    "use strict";
    var attack1_animation, attack2_animation, hit_animation;
    RPG.Unit.call(this, game_state, name, position, properties);
};

RPG.PlayerUnit.prototype = Object.create(RPG.Unit.prototype);
RPG.PlayerUnit.prototype.constructor = RPG.PlayerUnit;

RPG.PlayerUnit.prototype.act = function () {
    "use strict";
    this.game_state.prefabs.actions_menu.enable(true);
};