var arrowKeys;

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
    if (arrowKeys.left.isDown) {
        this.ship.rotation += 0.02;
    } else if (arrowKeys.right.isDown) {
        this.ship.rotation -= 0.02;
    }
}


// Custom Accessors

function addPlayer(thisGame) {
    this.ship = thisGame.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
    this.ship.scale.setTo(0.1);
    this.ship.anchor.setTo(0.5);
}

function addPlayerControls(thisGame) {
    arrowKeys = thisGame.game.input.keyboard.createCursorKeys();
}