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

RPG.TitleState.prototype.preload = function () {
    "use strict";
    this.game.load.text("default_data", "assets/levels/default_data.json");
}

RPG.TitleState.prototype.create = function () {
    "use strict";
    RPG.JSONLevelState.prototype.create.call(this);
    this.game.party_data = JSON.parse(this.game.cache.getText("default_data")).party_data;
};

RPG.TitleState.prototype.login = function () {
    "use strict";
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        
        firebase.auth().signInWithPopup(provider).then(this.start_game.bind(this)).catch(this.handle_error.bind(this));
    } else {
        this.start_game();
    }
};

RPG.TitleState.prototype.start_game = function () {
    "use strict";
    this.game.state.start("BootState", true, false, "assets/levels/town.json", "WorldState");
};

RPG.TitleState.prototype.handle_error = function (error) {
    "use strict";
    console.log(error);
};