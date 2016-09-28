/*
 ENGINE CALLS
*/
function backgroundManagerLoad(thisGame) {
    LoadBackground(thisGame);
}

function backgroundManagerCreate(thisGame) {
    drawBackground(thisGame);
}

function backgroundManagerUpdate(thisGame) {

}


/*
CUSTOM ACCESSORS
*/
function LoadBackground(thisGame) {
    thisGame.load.image('background', 'Assets/Images/background_galaxy.png');
    thisGame.load.image('background_star_1', 'Assets/Images/background_star_set_1.png');
    thisGame.load.image('background_star_2', 'Assets/Images/background_star_set_2.png');
}

function drawBackground(thisGame) {
    thisGame.background = thisGame.add.sprite(0, 0, 'background');
    thisGame.background_star1 = thisGame.add.sprite(0, 0, 'background_star_1');
    thisGame.background_star2 = thisGame.add.sprite(0, 0, 'background_star_2');

    thisGame.background_star1.alpha = 0;

    thisGame.background_star2.alpha = 0;

    game.add.tween(thisGame.background_star1).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    game.add.tween(thisGame.background_star2).to({ alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}