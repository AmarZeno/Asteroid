/// <reference path="Phaser.js" />
/// <reference path="Managers/playerManager.js" />

var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

var GameState = {

    // initialize game settings
    init: function() {
        // Adapt to screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //  This will run in Canvas mode, so let's gain a little speed and display
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;


        this.game.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {
        // Load asset
        playerManagerLoad(this);

    },

    create: function () {
        // Access load asset
        playerManagerCreate(this);
    },

    update: function () {
        // Game loop
        playerManagerUpdate(this);
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');