﻿/*
 VARIABLES
*/
let canInitialEngineLaunchPlay = true;
let isBGMPlaying = false;
/*
 ENGINE CALLS
*/
function audioManagerLoad(thisGame) {
    thisGame.load.audio('initialEngineLaunch', ['Assets/Audio/engine_sound_initial.mp3', 'Assets/Audio/engine_sound_initial.ogg']);
    thisGame.load.audio('engineLoop', ['Assets/Audio/engine_loop.mp3', 'Assets/Audio/engine_loop.ogg']);
    thisGame.load.audio('bgm', ['Assets/Audio/bgm.mp3', 'Assets/Audio/bgm.ogg']);
    thisGame.load.audio('player_death', ['Assets/Audio/player_death.mp3', 'Assets/Audio/player_death.ogg']);
}

function audioManagerCreate(thisGame) {
    console.log("create");
    addBackgroundSoundEffects(thisGame);
    handleKeyboardEvents(thisGame);
}

function audioManagerUpdate() {

}

function addBackgroundSoundEffects(thisGame) {
    this.initialEngineSound = thisGame.add.audio('initialEngineLaunch');
    this.engineLoop = thisGame.add.audio('engineLoop');
    this.bgm = thisGame.add.audio('bgm');
    this.initialEngineSound.volume = 1;
    this.initialEngineSound.onStop.add(resumeEngineLoop, this);
    this.playerDeathSound = thisGame.add.audio('player_death');
    playBGM();
    //this.initialEngineSound.addEventListener('ended', function () {
    //    this.engineLoop.play();
    //}, false);
}

function resumeEngineLoop() {
    if (canInitialEngineLaunchPlay == false) {
        this.engineLoop.loopFull();
    }
}


function handleKeyboardEvents(thisGame) {
    thisGame.input.keyboard.onDownCallback = function (e) {
        var keycode = e.keycode || e.which;
        switch (keycode) {
            case 38:
                // Up arrow
                playInitialEngineSound();
                break;
            default:
                break;
        }
    }

    thisGame.input.keyboard.onUpCallback = function (e) {
        var keycode = e.keycode || e.which;
        switch (keycode) {
            case 38:
                // Up arrow
                stopEngineSound();
                break;
            default:
                break;
        }
    }
}

function playBGM() {
    if (isBGMPlaying == false) {
        this.bgm.loopFull();
        isBGMPlaying = true;
    }
}

function playInitialEngineSound() {
    if (canInitialEngineLaunchPlay) {
        this.initialEngineSound.play();
        canInitialEngineLaunchPlay = false;
    }
}

function playShipBlastSound() {
    this.playerDeathSound.play();
}

function stopEngineSound() {
    canInitialEngineLaunchPlay = true;
    this.initialEngineSound.stop();
    this.engineLoop.stop();
}