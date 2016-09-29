/// <reference path="../phaser.js" />
/// <reference path="playerManager.js" />

var displayText;
var deathText;
let gameOver;


var currentTime = 0;


var currentLives = 5;


preloadUI = function (thisGame) {
    thisGame.load.image('power_bar_inner', 'Assets/Images/player_power_bar_fill.png');
    thisGame.load.image('power_bar_outer', 'Assets/Images/player_power_bar.png');
}

initUI = function (thisGame) {
    score = 0;
    gameOver = false;
    displayText = thisGame.add.text(50, 50, currentTime, { font: "60px arcadeclassicregular", fill: "#ffffff", align: "center" });
    deathText = thisGame.add.text(thisGame.world.centerX, thisGame.world.centerY, "", { font: "90px arcadeclassicregular", fill: "#ffffff", align: "left" });
    deathText.anchor.set(0.5);
    createHealthBar(thisGame);
}

updateUI = function () {
    currentTime = game.time.now;
    displayText.setText(currentTime/1000);
}

createHealthBar = function (thisGame) {
    this.healthBarStatus = thisGame.add.sprite(0, 50, 'power_bar_inner');
    updateHealthBar(5);
    var powerBarOuterWidth = game.cache.getImage('power_bar_outer').width;
    this.healthBar = thisGame.add.sprite(game.width - powerBarOuterWidth - 20, 50, 'power_bar_outer');

}

updateLivesUI = function () {

    currentLives--;

    updateHealthBar(currentLives);

    if (currentLives == 0) {
        deathText.setText("Game Over");
        gameOver = true;
    }
}

updateHealthBar = function (healthValue) {
    this.healthBarStatus.scale.setTo(healthValue, 1);
    this.healthBarStatus.x = game.width - this.healthBarStatus.width - 70;
}