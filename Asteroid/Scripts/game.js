/// <reference path="phaser.js" />
/// <reference path="Managers/AsteroidManager.js" />



var GameState = {

    // initialize game settings
    init: function() {
        // Adapt to screen size

    },

    preload: function () {
        // Load asset
        //     playerManagerLoad(this);
        BackgroundLoad();
        AsteroidsLoad();
        
    },

    create: function () {
        // Access load asset
        //    playerManagerCreate(this);
        BackgroundCreate();
        AsteroidsCreate();
    },

    update: function () {
        // Game loop
    //    playerManagerUpdate(this);
        AsteroidsUpdate();
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');