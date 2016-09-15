var arrowKeys;

/*
ENGINE CALLS
*/
// Extended system preload method
function playerManagerLoad(thisGame) {
    thisGame.load.image('ship', 'Assets/Images/ship.png');
}

// Extended system draw method
function playerManagerCreate(thisGame) {
    addPlayer(thisGame);
    addPlayerControls(thisGame);
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
    this.ship.scale.setTo(0.1);
    this.ship.anchor.setTo(0.5);
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);
}

function addPlayerControls(thisGame) {
    arrowKeys = thisGame.game.input.keyboard.createCursorKeys();
}

function capturePlayerActions() {
    if (arrowKeys.up.isDown) {
        game.physics.arcade.accelerationFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
    }
    else {
        this.ship.body.acceleration.set(0);
    }

    if (arrowKeys.left.isDown) {
        //this.ship.rotation -= 0.07;
        this.ship.body.angularVelocity = -300;
    } else if (arrowKeys.right.isDown) {
        // this.ship.rotation += 0.07;
        this.ship.body.angularVelocity = 300;
    } else {
        this.ship.body.angularVelocity = 0;
    }
    allowShipReflow();
}

function allowShipReflow() {
    if (this.ship.x < 0) {
        this.ship.x = game.width;
    }
    else if (this.ship.x > game.width) {
        this.ship.x = 0;
    }

    if (this.ship.y < 0) {
        this.ship.y = game.height;
    }
    else if (this.ship.y > game.height) {
        this.ship.y = 0;
    }
}