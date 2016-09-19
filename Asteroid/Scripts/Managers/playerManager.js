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
}


/*
CUSTOM ACCESSORS
*/

function addPlayer(thisGame) {
    this.ship = thisGame.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
   // this.ship.scale.setTo(0.1);
    this.ship.anchor.setTo(0.5);
    this.ship.anchor
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
}

function fireLaser() {
    if (game.time.now > laserTime) {
        laser = laserCollection.getFirstExists(false);

        if (laser) {
            laser.reset(this.ship.body.x + 16, this.ship.body.y + 16);
            laser.lifespan = 2000; 
            laser.rotation = this.ship.rotation;
            laser.scale.setTo(0.3);
            game.physics.arcade.velocityFromRotation(this.ship.rotation, 400, laser.body.velocity);
            laserTime = game.time.now + 50;
        }
    }
}