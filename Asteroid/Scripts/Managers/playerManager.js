
function playerManagerLoad(thisGame) {
    thisGame.load.image('ship', 'Assets/Images/ship.png');
}

function playerManagerCreate(thisGame) {
    createPlayer(thisGame);
}

function playerManagerUpdate() {

}

function createPlayer(thisGame) {
    this.ship = thisGame.add.sprite(10, 10, 'ship');
    this.ship.scale.setTo(0.1);
}