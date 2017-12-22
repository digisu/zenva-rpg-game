var RPG = RPG || {};

RPG.ItemMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
    
    this.item_name = properties.item_name;
};

RPG.ItemMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.ItemMenuItem.prototype.constructor = RPG.ItemMenuItem;

RPG.ItemMenuItem.prototype.select = function () {
    "use strict";
    console.log("using " + this.item_name);
};