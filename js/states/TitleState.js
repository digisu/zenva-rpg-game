var RPG = RPG || {};

RPG.TitleState = function(){
  'use strict';
  Phaser.State.call(this);
}

RPG.TitleState.prototype = Object.create(Phaser.State.prototype);
RPG.TitleState.prototype.constructor = RPG.TitleState;

RPG.TitleState.prototype.init = function(){
  'use strict';
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
}

RPG.TitleState.prototype.create = function(){
  'use strict';
  var background = this.game.add.sprite(0, 0, 'bg');
  var title_text = this.game.add.text(100, 100, 'digisumer');
  var start_button = this.game.add.button(320, 450, 'button_image', this.start_game);
}