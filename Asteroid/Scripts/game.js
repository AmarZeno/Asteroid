/// <reference path="Phaser.js" />
/// <reference path="Managers/configurationManager.js" />
/// <reference path="Managers/playerManager.js" />
/// <reference path="Managers/audioManager.js" />

var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

var GameState = {

    // initialize game settings
    init: function () {

        configurationManagerInit(this);

        // Start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function () {
        // Load asset
        LoadBackground(this);
        playerManagerLoad(this);
        AsteroidsLoad();
        preloadUI(this);
        audioManagerLoad(this);
    },

    create: function () {
        // Access loaded asset
       // this.background = this.add.sprite(0, 0, 'background');
        drawBackground(this);
        playerManagerCreate(this);
        AsteroidsCreate();
        initUI(this);
        audioManagerCreate(this);
    },

    update: function () {
        // Game loop
        if (!gameOver) {
            playerManagerUpdate(this);
            updateUI();
        }
        AsteroidsUpdate();
        audioManagerUpdate(this);
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');

/*
CUSTOM ACCESSORS
*/

function LoadBackground(thisGame) {
    thisGame.load.image('background', 'Assets/Images/background.png');
}

function drawBackground(thisGame) {
    thisGame.background = thisGame.add.sprite(0, 0, 'background');
}