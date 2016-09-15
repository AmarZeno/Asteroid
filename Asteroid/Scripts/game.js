/// <reference path="Phaser.js" />
/// <reference path="test.js" />

var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {

    // initialize game settings
    init: function() {
        // Adapt to screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 100;

        test();
    },

    preload: function () {
        // Load asset
        this.load.image('background', 'Assets/Images/background.jpg');
        this.load.image('chicken', 'Assets/Images/Chicken.png');
        this.load.image('horse', 'Assets/Images/horse.png');
        this.load.image('pig', 'Assets/Images/pig.png');

        this.loa
    },
    create: function () {
        // Access load asset
        this.background = this.game.add.sprite(0, 0, 'background');
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'chicken');
        this.chicken.anchor.setTo(0.5, 0.5);
        this.chicken.scale.setTo(2, 1);
        this.game.physics.arcade.enable(this.chicken);
        this.chicken.body.allowGravity = false;
        this.chicken.body.immovable = true;

        this.horse = this.game.add.sprite(this.game.world.centerX, 10, 'horse');
        this.horse.scale.setTo(0.5);
        this.game.physics.arcade.enable(this.horse);

        this.pig = this.game.add.sprite(120, 120, 'pig');
        this.pig.anchor.setTo(0.5);
        this.pig.scale.setTo(-1, -1);
        this.pig.angle = -45;
    },
    update: function () {
        // Game loop

       this.pig.angle += 0.5;
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');