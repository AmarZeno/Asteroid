/// <reference path="Phaser.js" />
/// <reference path="Managers/configurationManager.js" />
/// <reference path="Managers/playerManager.js" />
/// <reference path="Managers/audioManager.js" />
/// <reference path="Managers/bootManager.js" />

var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

var BootState = {
    init: function () {
        configurationManagerInit(this);
        // Start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function () {
        bootManagerLoad(this);
    },

    create: function () {
        bootManagerCreate(this);
    },

    update: function () {
        bootManagerUpdate(this);
    }
}

var GameState = {

    // initialize game settings
    init: function () {

        configurationManagerInit(this);

        // Start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function () {
        // Load asset
        backgroundManagerLoad(this);
        playerManagerLoad(this);
        AsteroidsLoad();
        preloadUI(this);

        PickupsLoad();

        audioManagerLoad(this);

    },

    create: function () {
        // Access loaded asset
       // this.background = this.add.sprite(0, 0, 'background');
        backgroundManagerCreate(this);
        playerManagerCreate(this);
        AsteroidsCreate();
        PickupsCreate();
        initUI(this);
        audioManagerCreate(this);
    },

    update: function () { 
        // Game loop
        backgroundManagerUpdate(this);
        if (!gameOver) {
            playerManagerUpdate(this);
            NormalPickupsUpdate();
            updateUI();
        }
        AsteroidsUpdate();
        audioManagerUpdate(this);
    }
};

game.state.add('GameState', GameState);
game.state.add('BootState', BootState);
game.state.start('GameState');
