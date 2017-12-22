var RPG = RPG || {};

RPG.Item = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
};

RPG.Item.prototype = Object.create(RPG.Prefab.prototype);
RPG.Item.prototype.constructor = RPG.Item;