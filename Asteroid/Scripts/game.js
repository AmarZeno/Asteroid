/// <reference path="Phaser.js" />
/// <reference path="Managers/playerManager.js" />

var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

var GameState = {

    // initialize game settings
    init: function() {
        // Adapt to screen size

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