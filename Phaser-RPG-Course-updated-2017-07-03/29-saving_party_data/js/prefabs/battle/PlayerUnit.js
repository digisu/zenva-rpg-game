var RPG = RPG || {};

RPG.PlayerUnit = function (game_state, name, position, properties) {
    "use strict";
    var attack1_animation, attack2_animation, hit_animation;
    RPG.Unit.call(this, game_state, name, position, properties);
    
    this.current_level = 0;
    this.experience = 0;
};

RPG.PlayerUnit.prototype = Object.create(RPG.Unit.prototype);
RPG.PlayerUnit.prototype.constructor = RPG.PlayerUnit;

RPG.PlayerUnit.prototype.act = function () {
    "use strict";
    this.game_state.prefabs.actions_menu.enable(true);
};

RPG.PlayerUnit.prototype.receive_experience = function (experience) {
    "use strict";
    this.experience += experience;
    console.log("received experience " + experience);
    var next_level_data = this.game_state.experience_table[this.current_level];
    if (this.experience >= next_level_data.required_exp) {
        this.current_level += 1;
        this.experience = 0;
        for (var stat in next_level_data.stats_increase) {
            if (next_level_data.stats_increase.hasOwnProperty(stat)) {
                this.stats[stat] += next_level_data.stats_increase[stat];
            }
        }
    }
};