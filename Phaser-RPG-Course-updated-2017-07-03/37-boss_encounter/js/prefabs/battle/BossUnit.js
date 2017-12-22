var RPG = RPG || {};

RPG.BossUnit = function (game_state, name, position, properties) {
    "use strict";
    RPG.EnemyUnit.call(this, game_state, name, position, properties);
    
    console.log("creating the boss");
};

RPG.BossUnit.prototype = Object.create(RPG.EnemyUnit.prototype);
RPG.BossUnit.prototype.constructor = RPG.BossUnit;