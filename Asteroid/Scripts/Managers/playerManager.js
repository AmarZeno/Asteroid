/// <reference path="audioManager.js" />

/*
VARIABLES
*/

var arrowKeys;

var laser;
var laserCollection;
var laserTime = 0;

let didHit = false;

var emitter;

/*
ENGINE CALLS
*/
// Extended system preload method
function playerManagerLoad(thisGame) {
    thisGame.load.image('ship', 'Assets/Images/ship.png');
    thisGame.load.spritesheet('ship_sprite', 'Assets/Images/ship_sprite_new.png', 60, 30, 9);
    thisGame.load.image('laser', 'Assets/Images/blue_laser.png');
    thisGame.load.image('fire1', 'Assets/Images/fire1.png');
    thisGame.load.image('fire2', 'Assets/Images/fire2.png');
    thisGame.load.image('fire3', 'Assets/Images/fire3.png');
    thisGame.load.image('smoke', 'Assets/Images/smoke-puff.png');
    //thisGame.OVERLAP_BIAS = 50;
}

// Extended system draw method
function playerManagerCreate(thisGame) {
    addPlayer(thisGame);
    addPlayerControls(thisGame);
    addBackgroundSoundEffects(thisGame);
    createLaserCollection();
    addBlastEmitters();
}

// Extended system update method
function playerManagerUpdate(thisGame) {
    capturePlayerActions();
    checkPlayerCollision();
    checkLaserCollision(); 
    startBlastEmitter();
    alertLowHealth();
}


/*
CUSTOM ACCESSORS
*/

function addPlayer(thisGame) {
    this.ship = thisGame.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship_sprite');
    this.ship.scale.setTo(2);
    this.ship.anchor.setTo(0.5);
    this.ship.Ispushing = true;
    var accelerate = this.ship.animations.add("accelerate");
    this.ship.animations.add('normal', [0], 30, true);
    this.ship.animations.add('accelerate', [1, 2, 3, 4], 30, true);
    this.ship.animations.add('normalhit', [5, 6], 5, true);
    this.ship.animations.add('acceleratehit', [7, 8], 5, true);
    this.ship.animations.play('normal');
    this.ship.name = "ship";
    
    // this.ship.anchor
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);

    this.ship.body.mass = 125;
    //this.ship.body.bounce.set(1);

}

function addPlayerControls(thisGame) {
    arrowKeys = thisGame.game.input.keyboard.createCursorKeys();
}

function addBlastEmitters() {
    // Emitters
    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);
    emitter.makeParticles(['fire1', 'fire2', 'fire3', 'smoke']);
    emitter.gravity = 200;
    emitter.setAlpha(1, 0, 3000);
    emitter.setScale(0.8, 0, 0.8, 0, 3000);
    
   // startBlastEmitter();
}

function capturePlayerActions() {
    // Acceleration
    if (arrowKeys.up.isDown) {
        game.physics.arcade.accelerationFromRotation(this.ship.rotation, 1000, this.ship.body.acceleration);
        this.ship.body.maxVelocity.x = 400;
        this.ship.body.maxVelocity.y = 400;
        if (didHit == false) {
            this.ship.animations.play('accelerate');
        } else {
            this.ship.animations.play('acceleratehit');
        }
    } else {
        this.ship.body.acceleration.set(0);
        if (didHit == false) {
            this.ship.animations.play('normal');
        } else {
            this.ship.animations.play('normalhit');
        }
    }

    // Rotation
    if (arrowKeys.left.isDown) {
        this.ship.body.angularVelocity = -500;
    } else if (arrowKeys.right.isDown) {
        this.ship.body.angularVelocity = 500;
    } else {
        this.ship.body.angularVelocity = 0;
    }

    screenWrap(this.ship, 0);

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && laserTime < game.time.now) {
      //  fireLaser();
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //  fireLaser();
        }
    }
}


function createLaserCollection() {
    //  Our ships lasers
    laserCollection = game.add.group();
    laserCollection.enableBody = true;
    laserCollection.physicsBodyType = Phaser.Physics.ARCADE;

    //  Create one set of shooting at at time
    laserCollection.createMultiple(10, 'laser');
    laserCollection.setAll('anchor.x', 0.5);
    laserCollection.setAll('anchor.y', 0.5);
    laserCollection.setAll('name', "laser");
    //laserCollection.setAll('scale.x', 0.3);
    //laserCollection.setAll('scale.y', 0.3);
    //laserCollection.body.updateBounds(laser.scale.x, laser.scale.y);
}

function fireLaser() {
    if (game.time.now > laserTime) {
        laser = laserCollection.getFirstExists(false);

        if (laser) {
            laser.reset(this.ship.body.x + 16, this.ship.body.y + 16);
            laser.lifespan = 2000;
            laser.rotation = this.ship.rotation;

          //  laser.body.force = 1000;

            game.physics.arcade.velocityFromRotation(this.ship.rotation, 1500, laser.body.velocity);

            laserTime = game.time.now + 500;
        }
    }
}

function checkPlayerCollision() {
    game.physics.arcade.collide(this.ship, Asteroids_Grey, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, Asteroids_Grey_Med, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, Asteroids_Grey_Small, playerRespawn, null, this);
}

function checkLaserCollision() {
    laser = laserCollection.getFirstExists(true);
    if (laser != null) {
     //   game.debug.body(laser, 'red', false); game.debug.spriteBounds(this.laser, 'pink', false);
    }
    game.physics.arcade.overlap(this.laser, Asteroids_Grey, AsteroidsCollide, null, this);
    game.physics.arcade.overlap(this.laser, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    game.physics.arcade.overlap(this.laser, Asteroids_Grey_Small, AsteroidsCollide, null, this);
}

function playerRespawn(sprite1, sprite2) {
    AsteroidsCollide(sprite1, sprite2);

    // make sure collision is active for asteroid
    if ((sprite1.name == "ship" && sprite2.canCollide) || (sprite2.name == "ship" && sprite1.canCollide)) {

        updateLivesUI();
        didHit = true;
        setTimeout(function () { didHit = false; }, 1000);
    }
}

function startBlastEmitter() {
    if (gameOver == true) { 
        emitter.emitX = this.ship.x;
        emitter.emitY = this.ship.y;
        emitter.start(true, 15000, null, 30);
        this.ship.kill();
        playShipBlastSound();
    }
}

function alertLowHealth() {
    if (currentLives == 1) {
        didHit = true;
    } 
}