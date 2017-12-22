var RPG = RPG || {};

var game = new Phaser.Game(640, 480, Phaser.CANVAS);

game.inventory = new RPG.Inventory();

game.state.add("BootState", new RPG.BootState());
game.state.add("LoadingState", new RPG.LoadingState());
game.state.add("TitleState", new RPG.TitleState());
game.state.add("WorldState", new RPG.WorldState());
game.state.add("BattleState", new RPG.BattleState());
game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState");