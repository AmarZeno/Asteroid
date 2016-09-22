﻿/// <reference path="../phaser.js" />

var score;
var displayText;
var deathText;
var gameOver;

var life1;
var life2;
var life3;

var currentLives = 100;
var currenthealth = 100;
var healthbar;

preloadUI = function (thisGame) {
    thisGame.load.image('life', 'Assets/Images/ship.png');
    thisGame.load.image('healthbar', 'Assets/Images/healthbar.png');
}

initUI = function (thisGame) {
    score = 0;
    gameOver = false;
    displayText = thisGame.add.text(50, 50, score, { font: "50px Verdana", fill: "#ffffff", align: "center" });
    deathText = thisGame.add.text(thisGame.world.centerX, thisGame.world.centerY, "", { font: "70px Verdana", fill: "#ffffff", align: "left" });
    deathText.anchor.set(0.5);

    life1 = thisGame.add.sprite(30, 150, 'life');
    life1.rotation = Math.PI * 3 / 2;
    life2 = thisGame.add.sprite(70, 150, 'life');
    life2.rotation = Math.PI * 3 / 2;
    life3 = thisGame.add.sprite(110, 150, 'life');
    life3.rotation = Math.PI * 3 / 2;
    healthbar = thisGame.add.sprite(150, 150, 'healthbar');
}

updateUI = function (points) {
    score += points;
    displayText.setText(score);
}

updateLivesUI = function () {
    currentLives--;

    if (currentLives == 2) {
        life3.visible = false;
    }
    else if (currentLives == 1) {
        life2.visible = false;
    }
    else if (currentLives == 0) {
        life1.visible = false;
        deathText.setText("Game Over");
        gameOver = true;
    }
}

function updateHealth(add, number)
{
    if(add == true)
    {
        currenthealth += number;
        if (currenthealth >= 100)
            currenthealth = 100;
    }
    else
    {
       currenthealth -= number;
       if (currenthealth <= 0) {
           currenthealth = 0;
           deathText.setText("Game Over");
           gameOver = true;
       }
    }
}