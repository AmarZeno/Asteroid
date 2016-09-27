/*
ENGINE CALLS
*/

// Extended system init method
function configurationManagerInit(thisGame) {
    // Adapt to screen size
    thisGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    thisGame.scale.pageAlignHorizontally = true;
    thisGame.scale.pageAlignVertically = true;

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;
}