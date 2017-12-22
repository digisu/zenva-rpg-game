var RPG = RPG || {};

RPG.BattleState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);

    this.prefab_classes = {
        background: RPG.Prefab.prototype.constructor,
        player_unit: RPG.PlayerUnit.prototype.constructor,
        enemy_unit: RPG.EnemyUnit.prototype.constructor,
        menu: RPG.Menu.prototype.constructor,
        menu_item: RPG.MenuItem.prototype.constructor,
        physical_attack_menu_item: RPG.PhysicalAttackMenuItem.prototype.constructor,
        enemy_menu_item: RPG.EnemyMenuItem.prototype.constructor
    }
};

RPG.BattleState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.BattleState.prototype.constructor = RPG.BattleState;

RPG.BattleState.prototype.create = function () {
    "use strict";
    RPG.JSONLevelState.prototype.create.call(this);
    
    this.units = new PriorityQueue({comparator: function (unit_a, unit_b) {
        return unit_a.act_turn - unit_b.act_turn;
    }});
    
    this.groups.player_units.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);
    this.groups.enemy_units.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);
	
	this.next_turn();
};

RPG.BattleState.prototype.next_turn = function () {
    "use strict";    
    this.current_unit = this.units.dequeue();
    if (this.current_unit.alive) {
        this.current_unit.act();
        this.current_unit.calculate_act_turn(this.current_unit.act_turn);
        this.units.queue(this.current_unit);
    } else {
        this.next_turn();
    }
};