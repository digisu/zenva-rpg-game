var RPG = RPG || {};

RPG.Inventory = function () {
    "use strict";    
    this.item_classes = {
        "potion": RPG.Item.prototype.constructor
    };

    this.items = {};
};

RPG.Inventory.prototype.collect_item = function (game_state, item_object) {
    "use strict";
    if (this.items[item_object.type]) {
        this.items[item_object.type].amount += 1;
    } else {
        var item = new this.item_classes[item_object.type](game_state, item_object.type, {x: 0, y: 0}, item_object.properties);
        this.items[item_object.type] = {prefab: item, amount: 1};
    }
};