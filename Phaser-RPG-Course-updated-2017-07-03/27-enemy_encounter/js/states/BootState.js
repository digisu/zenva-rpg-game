var RPG = RPG || {};

RPG.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

RPG.BootState.prototype = Object.create(Phaser.State.prototype);
RPG.BootState.prototype.constructor = RPG.BootState;

RPG.BootState.prototype.init = function (level_file, next_state, extra_parameters) {
    "use strict";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    this.level_file = level_file;
    this.next_state = next_state;
    this.extra_parameters = extra_parameters;
};

RPG.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level_file", this.level_file);
};

RPG.BootState.prototype.create = function () {
    "use strict";
    var level_data = JSON.parse(this.game.cache.getText("level_file"));
    this.game.state.start("LoadingState", true, false, level_data, this.next_state, this.extra_parameters);
};