var RPG = RPG || {};

RPG.WorldState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "player": RPG.Prefab.prototype.constructor
    };
};

RPG.WorldState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.WorldState.prototype.constructor = RPG.WorldState;

RPG.WorldState.prototype.create = function () {
    "use strict";
    var tileset_index, group_name, object_layer, collision_tiles, user_input_name;
	
	// create map and set tileset
	this.map = this.game.add.tilemap(this.level_data.map.key);
    tileset_index = 0;
    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, this.level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);
	
    // create map layers before groups
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // collision layer
            this.map.setCollisionByExclusion([-1], true, layer.name);
        }
    }, this);
    // resize the world to be the size of the current layer
    this.layers[this.map.layer.name].resizeWorld();
    
    RPG.JSONLevelState.prototype.create.call(this);
    
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // create layer objects
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
};

RPG.WorldState.prototype.create_object = function (object) {
    "use strict";
    var object_y, position, prefab;
    // tiled coordinates starts in the bottom left corner
    object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
    position = {"x": object.x + (this.map.tileHeight / 2), "y": object_y};
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
    }
    this.prefabs[object.name] = prefab;
};
