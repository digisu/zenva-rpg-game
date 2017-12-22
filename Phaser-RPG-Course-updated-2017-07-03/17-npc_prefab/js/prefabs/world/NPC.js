var RPG = RPG || {};

RPG.NPC = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.message = this.game_state.game.cache.getText(properties.message);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

RPG.NPC.prototype = Object.create(RPG.Prefab.prototype);
RPG.NPC.prototype.constructor = RPG.NPC;

RPG.NPC.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.players, this.talk, null, this);
};

RPG.NPC.prototype.talk = function (npc, player) {
    "use strict";
    player.stop();
    console.log(this.message);
};