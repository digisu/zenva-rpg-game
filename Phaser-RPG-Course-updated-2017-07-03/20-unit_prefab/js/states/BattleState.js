var RPG = RPG || {};

RPG.BattleState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);

    this.prefab_classes = {
        background: RPG.Prefab.prototype.constructor,
        player_unit: RPG.Unit.prototype.constructor,
        enemy_unit: RPG.Unit.prototype.constructor
    }
};

RPG.BattleState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.BattleState.prototype.constructor = RPG.BattleState;