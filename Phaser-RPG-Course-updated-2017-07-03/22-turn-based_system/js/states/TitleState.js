var RPG = RPG || {};

RPG.TitleState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
        
    this.prefab_classes = {
        background: RPG.Prefab.prototype.constructor,
        text: RPG.TextPrefab.prototype.constructor
    }
};

RPG.TitleState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.TitleState.prototype.constructor = RPG.TitleState;

RPG.TitleState.prototype.start_game = function () {
    "use strict";
    this.game.state.start("BootState", true, false, "assets/levels/town.json", "WorldState");
};