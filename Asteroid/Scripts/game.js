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
        backgroundManagerLoad(this);
        playerManagerLoad(this);
        AsteroidsLoad();
        preloadUI(this);

       // PickupsLoad();

        audioManagerLoad(this);

    },

    create: function () {
        // Access loaded asset
       // this.background = this.add.sprite(0, 0, 'background');
        backgroundManagerCreate(this);
        playerManagerCreate(this);
        AsteroidsCreate();
      //  PickupsCreate();
        initUI(this);
        audioManagerCreate(this);
    },

    update: function () {
        backgroundManagerUpdate(this);
        // Game loop
        if (!gameOver) {
            playerManagerUpdate(this);

            updateUI();

           // NormalPickupsUpdate();
          //  SwitchModePickupsUpdate();

        }
        AsteroidsUpdate();
        audioManagerUpdate(this);
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
