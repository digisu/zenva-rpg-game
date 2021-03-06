var RPG = RPG || {};

RPG.EnemySpawner = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.encounter = properties.encounter;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

RPG.EnemySpawner.prototype = Object.create(RPG.Prefab.prototype);
RPG.EnemySpawner.prototype.constructor = RPG.EnemySpawner;

RPG.EnemySpawner.prototype.update = function () {
    "use strict";
    this.overlapping = this.game_state.game.physics.arcade.collide(this, this.game_state.groups.players, this.spawn, null, this);
};

RPG.EnemySpawner.prototype.spawn = function () {
    "use strict";
    this.game_state.game.state.start("BootState", true, false, "assets/levels/battle.json", "BattleState", "BattleState");
};