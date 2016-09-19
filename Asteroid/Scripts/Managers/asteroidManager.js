var Asteroid;
var Asteroids_Grey;
var Asteroids_Red;
var AsteroidTime = 0;
var RandomCreatePosition;
var totalexistingAsteroids = 10;

AsteroidsLoad = function ()
{
    game.load.image('Asteroids_Grey', 'Assets/Images/asteroids_grey.png');
    game.load.image('Asteroids_Red', 'Assets/Images/asteroids_red.png');
}

/*AsteroidsCreate = function ()
{
    Asteroids = game.add.sprite(1920, 1080, 'Asteroids');
    Asteroids.anchor.set(0.5);
}*/

AsteroidsCreate = function()
{
    Asteroids_Grey = game.add.group();
    Asteroids_Grey.enableBody = true;
    Asteroids_Grey.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Red = game.add.group();
    Asteroids_Red.enableBody = true;
    Asteroids_Red.physicsBodytype = Phaser.Physics.ARCADE;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable([Asteroids_Red, Asteroids_Grey]);

    Asteroids_Grey.createMultiple(totalexistingAsteroids / 2, 'Asteroids_Grey');
    Asteroids_Grey.setAll('anchor.x', 0.5);
    Asteroids_Grey.setAll('anchor.y', 0.5);

    Asteroids_Red.createMultiple(totalexistingAsteroids / 2, 'Asteroids_Red');
    Asteroids_Red.setAll('anchor.x', 0.5);
    Asteroids_Red.setAll('anchor.y', 0.5);
}

AsteroidsUpdate = function()
{
    if (game.time.now > AsteroidTime)
    {
        var AsteroidsType = Math.random() * 2;

        if (AsteroidsType >= 0 && AsteroidsType < 1)
            Asteroid = Asteroids_Grey.getFirstExists(false);
        else
            Asteroid = Asteroids_Red.getFirstExists(false);

        if (Asteroid)
        {
            RandomCreatePosition = Math.random()*4;
            if (RandomCreatePosition >= 0 && RandomCreatePosition < 1)
            {
                Asteroid.reset(-100, Math.random() * game.height);
                Asteroid.rotation = Math.random() * Math.PI / 2 - Math.PI / 4;
                Asteroid.scale.setTo(3);
            }
            else if (RandomCreatePosition >= 1 && RandomCreatePosition < 2) {
                Asteroid.reset(game.width+100, Math.random() * game.height);
                Asteroid.rotation = Math.random() * Math.PI / 2 + Math.PI * 3 / 4;
            }
            else if (RandomCreatePosition >= 2 && RandomCreatePosition < 3) {
                Asteroid.reset(Math.random() * game.width, -100);
                Asteroid.rotation = Math.random() * Math.PI / 2 + Math.PI  / 4;
            }
            else if (RandomCreatePosition >= 3 && RandomCreatePosition < 4) {
                Asteroid.reset(Math.random() * game.width, game.height + 100);
                Asteroid.rotation = Math.random() * Math.PI / 2 + Math.PI  * 5 / 4;
            }
      //      Asteroid.reset(500, 400);
            Asteroid.lifespan = 6000000;
     //       Asteroid.rotation = Math.random()*Math.PI*2;
            game.physics.arcade.velocityFromRotation(Asteroid.rotation, 200, Asteroid.body.velocity);
            AsteroidTime = game.time.now + 200;
        }
    }
    game.physics.arcade.collide(Asteroids_Red, Asteroids_Grey, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Red, Asteroids_Red, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey, AsteroidsCollide, null, this);

    Asteroids_Grey.forEachExists(screenWrap,this,120);
    Asteroids_Red.forEachExists(screenWrap,this,120);
}

function AsteroidsCollide (sprite1 , sprite2)
{
    sprite1.kill();
    sprite2.kill();
}

