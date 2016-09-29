


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
}

function bootManagerCreate(thisGame) {

    this.selectSound = thisGame.add.audio('select_sound');

    thisGame.gameTitle = thisGame.add.sprite(0, 0, 'gameTitle');
    thisGame.gameTitle.scale.setTo(0.5);
    thisGame.gameTitle.anchor.setTo(0.5);
    thisGame.gameTitle.reset(thisGame.game.world.centerX, 200);

    startGameText = thisGame.add.text(thisGame.world.centerX, thisGame.world.centerY + 100, "", { font: "70px arcadeclassicregular", fill: "#ffffff", align: "left" });
    startGameText.setText("Start Game");
    startGameText.anchor.set(0.5);

    exitGameText = thisGame.add.text(thisGame.world.centerX, thisGame.world.centerY + 220, "", { font: "70px arcadeclassicregular", fill: "#ffffff", align: "left" });
    exitGameText.setText("Exit Game");
    exitGameText.anchor.set(0.5);

    thisGame.ship2 = thisGame.add.sprite(0, 0, 'ship');
    thisGame.ship2.reset(thisGame.world.centerX - startGameText.width / 2 - thisGame.ship2.width - 10, thisGame.world.centerY + 100);
    thisGame.ship2.scale.setTo(1.5);
    thisGame.ship2.anchor.setTo(0.5);
    thisGame.ship2.angle -= 90;

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
                    thisGame.ship2.x = thisGame.world.centerX - startGameText.width / 2 - thisGame.ship2.width - 10;
                    thisGame.ship2.y = thisGame.world.centerY + 220;
                    isSelectionOnTop = false;
                } else {
                    thisGame.ship2.x = thisGame.world.centerX - startGameText.width / 2 - thisGame.ship2.width - 10;
                    thisGame.ship2.y = thisGame.world.centerY + 100;
                    isSelectionOnTop = true;
                }
                break;
            case 32:
                if (isSelectionOnTop == true) {

                    game.state.start('GameState');
                    isSelectionOnTop = false;
                } else {

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
            thisGame.ship.x = thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 220;
         //   game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 220 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = false;
        } else {
            thisGame.ship.x = thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 100;

        //    game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = true;
        }
    } else if (arrowKeys.up.isDown) {
        playSelectSound();
        if (isSelectionOnTop == true) {
            thisGame.ship.x = thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 220;
            //   game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 220 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = false;
        } else {
            thisGame.ship.x = thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10;
            thisGame.ship.y = thisGame.world.centerY + 100;

            //    game.add.tween(thisGame.ship).to({ x: thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, y: thisGame.world.centerY + 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            isSelectionOnTop = true;
        }
    }
}

function playSelectSound() {
    this.selectSound.play();
}