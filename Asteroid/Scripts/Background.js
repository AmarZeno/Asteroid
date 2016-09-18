var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

/*function Asteroids(StartPositionX,StartPositionY,VelocityX,VelocityY)
{
    this.CurPosition.X = StartPositionX;
    this.CurPosition.Y = StartPositionY;
    this.Velocity.X = VelocityX;
    this.Velocity.Y = VelocityY;
}

Asteroids.prototype.move = function()
{
    this.CurPosition.X += this.Velocity.X;
    this.CurPosition.Y += this.Velocity.Y;
}
*/

BackgroundLoad = function () {
    game.load.image('space', 'Assets/images/Background.jpg');
}

BackgroundCreate = function () {
    game.add.tileSprite(0, 0, game.width, game.height, 'space');

}

function screenWrap(sprite) {

    if (sprite.x < 0) {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width) {
        sprite.x = 0;
    }

    if (sprite.y < 0) {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height) {
        sprite.y = 0;
    }

}