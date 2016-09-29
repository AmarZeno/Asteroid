


var startGameText;

var exitGameText;

var arrowKeys;

function bootManagerLoad(thisGame) {
    thisGame.load.image('gameTitle', 'Assets/Images/logo.png');
    thisGame.load.image('ship', 'Assets/Images/ship.png');
}

function bootManagerCreate(thisGame) {
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

    thisGame.ship = thisGame.add.sprite(0, 0, 'ship');
    thisGame.ship.reset(thisGame.world.centerX - startGameText.width / 2 - thisGame.ship.width - 10, thisGame.world.centerY + 100);
    thisGame.ship.scale.setTo(1.5);
    thisGame.ship.anchor.setTo(0.5);
    thisGame.ship.angle -= 90;

    arrowKeys = thisGame.game.input.keyboard.createCursorKeys();
}

function bootManagerUpdate(thisGame) {
    toggleSelectPosition();
}

function toggleSelectPosition() {
    if (arrowKeys.up.isDown) {

    }
}