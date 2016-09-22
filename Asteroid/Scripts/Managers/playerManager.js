/*
VARIABLES
*/

var arrowKeys;

var laser;
var laserCollection;
var laserTime = 0;

/*
ENGINE CALLS
*/
// Extended system preload method
function playerManagerLoad(thisGame) {
    thisGame.load.image('ship', 'Assets/Images/ship.png');
    thisGame.load.image('laser', 'Assets/Images/blue_laser.png');
    //thisGame.OVERLAP_BIAS = 50;
}

// Extended system draw method
function playerManagerCreate(thisGame) {
    addPlayer(thisGame);
    addPlayerControls(thisGame);
    createLaserCollection();
}

// Extended system update method
function playerManagerUpdate(thisGame) {
    capturePlayerActions();
    checkPlayerCollision();
    checkLaserCollision();
}


/*
CUSTOM ACCESSORS
*/

function addPlayer(thisGame) {
    this.ship = thisGame.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
    this.ship.scale.setTo(2);
    this.ship.anchor.setTo(0.5);
    this.ship.Ispushing = true;
    // this.ship.anchor
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);
}

function addPlayerControls(thisGame) {
    arrowKeys = thisGame.game.input.keyboard.createCursorKeys();
}

function capturePlayerActions() {
    // Acceleration
    if (arrowKeys.up.isDown) {
        game.physics.arcade.accelerationFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
    } else {
        this.ship.body.acceleration.set(0);
    }

    // Rotation
    if (arrowKeys.left.isDown) {
        this.ship.body.angularVelocity = -300;
    } else if (arrowKeys.right.isDown) {
        this.ship.body.angularVelocity = 300;
    } else {
        this.ship.body.angularVelocity = 0;
    }

    screenWrap(this.ship, 0);

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireLaser();
    }
}


function createLaserCollection() {
    //  Our ships lasers
    laserCollection = game.add.group();
    laserCollection.enableBody = true;
    laserCollection.physicsBodyType = Phaser.Physics.ARCADE;

    //  Create one set of shooting at at time
    laserCollection.createMultiple(1, 'laser');
    laserCollection.setAll('anchor.x', 0.5);
    laserCollection.setAll('anchor.y', 0.5);
    laserCollection.setAll('name', "laser");
}

function fireLaser() {
    if (game.time.now > laserTime) {
        laser = laserCollection.getFirstExists(false);

        if (laser) {
            laser.reset(this.ship.body.x + 16, this.ship.body.y + 16);
            laser.lifespan = 2000;
            laser.rotation = this.ship.rotation;
            laser.scale.setTo(0.3);
            laser.body.force = 1000;
            game.physics.arcade.velocityFromRotation(this.ship.rotation, 500, laser.body.velocity);
            laserTime = game.time.now + 500;
        }
    }
}

function checkPlayerCollision() {
    game.physics.arcade.collide(this.ship, Asteroids_Red, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, Asteroids_Grey, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, Asteroids_Red_Med, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, Asteroids_Grey_Med, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, Asteroids_Red_Small, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, Asteroids_Grey_Small, playerRespawn, null, this);
    game.physics.arcade.collide(this.ship, NormalPickups, EatingNormalPickups, null, this);
    game.physics.arcade.collide(this.ship, SwitchModePickups, EatingSwitchModePickups, null, this);
}

function checkLaserCollision() {
    laser = laserCollection.getFirstExists(true);
    if (laser != null) {
        game.debug.body(laser, 'red', false); game.debug.spriteBounds(this.laser, 'pink', false);
    }
   /* game.physics.arcade.overlap(laser, Asteroids_Red, AsteroidsCollide, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Grey, AsteroidsCollide, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Red_Med, AsteroidsCollide, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Red_Small, AsteroidsCollide, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Grey_Small, AsteroidsCollide, null, this);
    */
    game.physics.arcade.overlap(laser, Asteroids_Red, ShootAsteroids, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Grey, ShootAsteroids, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Red_Med, ShootAsteroids, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Grey_Med, ShootAsteroids, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Red_Small, ShootAsteroids, null, this);
    game.physics.arcade.overlap(laser, Asteroids_Grey_Small, ShootAsteroids, null, this);
}

function playerRespawn(sprite1, sprite2) {
    AsteroidsCollide(sprite1, sprite2);
    updateLivesUI();
    this.ship.body.angularVelocity = 0;
    this.ship.x = this.game.world.centerX;
    this.ship.y = this.game.world.centerY;
    this.ship.body.acceleration.set(0);
    this.ship.body.velocity.setTo(0, 0);
    this.ship.rotation = 0;
}