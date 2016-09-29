


var startGameText;

var exitGameText;

var arrowKeys;

let isSelectionOnTop = true;

let shouldPreventBubble = false;

let isBootState = true;

function bootManagerLoad(thisGame) {
    thisGame.load.image('gameTitle', 'Assets/Images/logo.png');
    thisGame.load.image('ship', 'Assets/Images/ship.png');
    thisGame.load.audio('select_sound', ['Assets/Audio/select_screen.mp3', 'Assets/Audio/select_screen.mp3']);
    thisGame.load.image('bg', 'Assets/Images/background_star_set_1.png');
    thisGame.load.image('start_game', 'Assets/Images/start_game.png');
    thisGame.load.image('exit_game', 'Assets/Images/exit_game.png');
    thisGame.load.image('begin_space', 'Assets/Images/begin_space.png');
    thisGame.load.image('controls', 'Assets/Images/control_manual.png');
}

function bootManagerCreate(thisGame) {

    this.selectSound = thisGame.add.audio('select_sound');

    thisGame.gameTitle = thisGame.add.sprite(0, 0, 'gameTitle');
    thisGame.gameTitle.scale.setTo(1);
    thisGame.gameTitle.anchor.setTo(0.5);
    thisGame.gameTitle.reset(thisGame.game.world.centerX, 500);

    startGameText = thisGame.add.text(thisGame.world.centerX, thisGame.world.centerY + 150, "", { font: "70px arcadeclassicregular", fill: "#ffffff", align: "left" });
    startGameText.setText("Start Game");
    startGameText.anchor.set(0.5);
    startGameText.alpha = 0;

    exitGameText = thisGame.add.text(thisGame.world.centerX, thisGame.world.centerY + 270, "", { font: "70px arcadeclassicregular", fill: "#ffffff", align: "left" });
    exitGameText.setText("Exit Game");
    exitGameText.anchor.set(0.5);
    exitGameText.alpha = 0;

    thisGame.startGame = thisGame.add.sprite(thisGame.world.centerX, thisGame.world.centerY + 150, 'start_game');
    thisGame.exitGame = thisGame.add.sprite(thisGame.world.centerX, thisGame.world.centerY + 270, 'exit_game');
    thisGame.startGame.anchor.set(0.5);
    thisGame.exitGame.anchor.set(0.5);

    thisGame.ship2 = thisGame.add.sprite(0, 0, 'ship');
    thisGame.ship2.reset(thisGame.world.centerX - thisGame.startGame.width / 2 - thisGame.ship2.width - 10, thisGame.world.centerY + 150);
    thisGame.ship2.scale.setTo(1.5);
    thisGame.ship2.anchor.setTo(0.5);
    thisGame.ship2.angle -= 90;

    thisGame.spaceKeyText = thisGame.add.sprite(400, 500, 'begin_space');
    thisGame.spaceKeyText.anchor.setTo(0.5);
    thisGame.spaceKeyText.reset(thisGame.world.centerX, thisGame.world.centerY + 390);
    thisGame.spaceKeyText.alpha = 0.2;
    game.add.tween(thisGame.spaceKeyText).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    thisGame.controlManual = thisGame.add.sprite(400, 500, 'controls');
    thisGame.controlManual.scale.setTo(0.5);
    thisGame.controlManual.reset(thisGame.world.width - thisGame.controlManual.width - 100, thisGame.world.centerY + 70);
    //thisGame.shipArtwork = thisGame.add.sprite(0, 0, 'ship');
    //thisGame.shipArtwork.reset(thisGame.world.centerX - startGameText.width / 2 - thisGame.ship2.width - 10, thisGame.world.centerY);
    //thisGame.shipArtwork.scale.setTo(2.5);
    //thisGame.shipArtwork.anchor.setTo(0.5);
    //thisGame.shipArtwork.angle += 145;

    arrowKeys = thisGame.game.input.keyboard.createCursorKeys();

    handleInitialKeyboardEvents(thisGame);
  //  toggleSelectPosition(thisGame);
}

function handleInitialKeyboardEvents(thisGame) {

    game.input.keyboard.onDownCallback = function (e) {
        var keycode = e.keycode || e.which;
        switch (keycode) {
            case 40:
            case 38:
                // Up and Down arrow
                
                playSelectSound();
                if (isSelectionOnTop == true) {
                    thisGame.ship2.x = thisGame.world.centerX - thisGame.startGame.width / 2 - thisGame.ship2.width - 10;
                    thisGame.ship2.y = thisGame.world.centerY + 270;
                    isSelectionOnTop = false;
                } else {
                    thisGame.ship2.x = thisGame.world.centerX - thisGame.startGame.width / 2 - thisGame.ship2.width - 10;
                    thisGame.ship2.y = thisGame.world.centerY + 150;
                    isSelectionOnTop = true;
                }
                break;
            case 32:
                if (isSelectionOnTop == true) {

                    game.state.start('GameState');
                    isSelectionOnTop = false;
                } else {
                    window.close();
                }
                break;
            default:
                break;
        }
    }
}


function bootManagerUpdate(thisGame) {
    
}

function toggleSelectPosition(thisGame) {

    if (arrowKeys.down.isDown) {
        alert('hi');
        playSelectSound();
     //   alert('pressed down');
        if (isSelectionOnTop == true) {
            thisGame.ship.x = thisGame.world.centerX - thisGame.startGame.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 270;
         //   game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 220 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = false;
        } else {
            thisGame.ship.x = thisGame.world.centerX - thisGame.startGame.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 150;

        //    game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = true;
        }
    } else if (arrowKeys.up.isDown) {
        playSelectSound();
        if (isSelectionOnTop == true) {
            thisGame.ship.x = thisGame.world.centerX - thisGame.startGame.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 270;
            //   game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 220 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = false;
        } else {
            thisGame.ship.x = thisGame.world.centerX - thisGame.startGame.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 150;

            //    game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = true;
        }
    }
}

function playSelectSound() {
    this.selectSound.play();
}