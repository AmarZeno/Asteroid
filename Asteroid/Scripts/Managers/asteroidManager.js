﻿/// <reference path="../phaser.js" />

var Asteroid;
var Asteroids_Grey;
var Asteroids_Red;
var AsteroidTime = 0;
var RandomCreatePosition;
var totalexistingAsteroids = 8;

AsteroidsLoad = function ()
{
    game.load.image('Asteroids_Grey', 'Assets/Images/Asteroids_Grey.png');
    game.load.image('Asteroids_Red', 'Assets/Images/Asteroids_Red.png');

    // Temp file names for medium sized asteroids
    game.load.image('Asteroids_Grey_Med', 'Assets/Images/Asteroids_Grey_Med.png');
    game.load.image('Asteroids_Red_Med', 'Assets/Images/Asteroids_Red_Med.png');

    // Temp file names for small sized asteroids
    game.load.image('Asteroids_Grey_Small', 'Assets/Images/Asteroids_Grey_Small.png');
    game.load.image('Asteroids_Red_Small', 'Assets/Images/Asteroids_Red_Small.png');

    // Load a particle effect for collisions?
}

/*AsteroidsCreate = function ()
{
    Asteroid = game.add.sprite(1920, 1080, 'Asteroids');
    Asteroid.anchor.set(0.5);
}*/

AsteroidsCreate = function()
{
    // Large asteroids
    Asteroids_Grey = game.add.group();
    Asteroids_Grey.enableBody = true;
    Asteroids_Grey.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Red = game.add.group();
    Asteroids_Red.enableBody = true;
    Asteroids_Red.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Grey.createMultiple(totalexistingAsteroids / 2, 'Asteroids_Grey');
    Asteroids_Grey.setAll('anchor.x', 0.5);
    Asteroids_Grey.setAll('anchor.y', 0.5);
    Asteroids_Grey.setAll('name', "large_grey");

    Asteroids_Red.createMultiple(totalexistingAsteroids / 2, 'Asteroids_Red');
    Asteroids_Red.setAll('anchor.x', 0.5);
    Asteroids_Red.setAll('anchor.y', 0.5);
    Asteroids_Red.setAll('name', "large_red");

    // Medium asteroidss
    Asteroids_Grey_Med = game.add.group();
    Asteroids_Grey_Med.enableBody = true;
    Asteroids_Grey_Med.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Red_Med = game.add.group();
    Asteroids_Red_Med.enableBody = true;
    Asteroids_Red_Med.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Grey_Med.createMultiple(totalexistingAsteroids, 'Asteroids_Grey_Med');
    Asteroids_Grey_Med.setAll('anchor.x', 0.5);
    Asteroids_Grey_Med.setAll('anchor.y', 0.5);
    Asteroids_Grey_Med.setAll('name', "medium_grey");

    Asteroids_Red_Med.createMultiple(totalexistingAsteroids, 'Asteroids_Red_Med');
    Asteroids_Red_Med.setAll('anchor.x', 0.5);
    Asteroids_Red_Med.setAll('anchor.y', 0.5);
    Asteroids_Red_Med.setAll('name', "medium_red");

    // Small asteroids
    Asteroids_Grey_Small = game.add.group();
    Asteroids_Grey_Small.enableBody = true;
    Asteroids_Grey_Small.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Red_Small = game.add.group();
    Asteroids_Red_Small.enableBody = true;
    Asteroids_Red_Small.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Grey_Small.createMultiple(totalexistingAsteroids * 2, 'Asteroids_Grey_Small');
    Asteroids_Grey_Small.setAll('anchor.x', 0.5);
    Asteroids_Grey_Small.setAll('anchor.y', 0.5);
    Asteroids_Grey_Small.setAll('name', "small_grey");

    Asteroids_Red_Small.createMultiple(totalexistingAsteroids * 2, 'Asteroids_Red_Small');
    Asteroids_Red_Small.setAll('anchor.x', 0.5);
    Asteroids_Red_Small.setAll('anchor.y', 0.5);
    Asteroids_Red_Small.setAll('name', "small_red");

    // Start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable([Asteroids_Red, Asteroids_Grey, Asteroids_Grey_Med, Asteroids_Red_Med, Asteroids_Grey_Small, Asteroids_Red_Small]);

    for (var i = 0; i < totalexistingAsteroids; i++) {

        //if (game.time.now > AsteroidTime) {
            var AsteroidsType = Math.random() * 2;

            if (AsteroidsType >= 0 && AsteroidsType < 1)
                Asteroid = Asteroids_Grey.getFirstExists(false);
            else
                Asteroid = Asteroids_Red.getFirstExists(false);

            if (Asteroid != null) {
                RandomCreatePosition = Math.random() * 4;
                if (RandomCreatePosition >= 0 && RandomCreatePosition < 1) {
                    Asteroid.reset(-100, Math.random() * game.height);
                    Asteroid.rotation = Math.random() * Math.PI / 2 - Math.PI / 4;
                }
                else if (RandomCreatePosition >= 1 && RandomCreatePosition < 2) {
                    Asteroid.reset(game.width + 100, Math.random() * game.height);
                    Asteroid.rotation = Math.random() * Math.PI / 2 + Math.PI * 3 / 4;
                }
                else if (RandomCreatePosition >= 2 && RandomCreatePosition < 3) {
                    Asteroid.reset(Math.random() * game.width, -100);
                    Asteroid.rotation = Math.random() * Math.PI / 2 + Math.PI / 4;
                }
                else if (RandomCreatePosition >= 3 && RandomCreatePosition < 4) {
                    Asteroid.reset(Math.random() * game.width, game.height + 100);
                    Asteroid.rotation = Math.random() * Math.PI / 2 + Math.PI * 5 / 4;
                }
                //      Asteroid.reset(500, 400);
                //       Asteroid.lifespan = 6000000;
                //       Asteroid.rotation = Math.random()*Math.PI*2;
                game.physics.arcade.velocityFromRotation(Asteroid.rotation, 150, Asteroid.body.velocity);
            //    AsteroidTime = game.time.now + 200;
            //}
        }
    }
}

AsteroidsUpdate = function()
{

    // Collisions
    //game.physics.arcade.collide(Asteroids_Red, Asteroids_Grey, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Red, Asteroids_Red, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Grey_Small, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Grey_Small, Asteroids_Grey_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Red, Asteroids_Red_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Red, Asteroids_Red_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Red_Med, Asteroids_Red_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Red_Med, Asteroids_Red_Small, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Red_Small, Asteroids_Red_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Grey, Asteroids_Red_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Grey, Asteroids_Red_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Red, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Red, Asteroids_Grey_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Red_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Red_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Grey_Small, Asteroids_Red_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Grey_Small, Asteroids_Red_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Red_Med, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Red_Med, Asteroids_Grey_Small, AsteroidsCollide, null, this);

    //game.physics.arcade.collide(Asteroids_Red_Small, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    //game.physics.arcade.collide(Asteroids_Red_Small, Asteroids_Grey_Small, AsteroidsCollide, null, this);

    // Screen wrapping
    Asteroids_Grey.forEachExists(screenWrap, this);
    Asteroids_Grey_Med.forEachExists(screenWrap, this);
    Asteroids_Grey_Small.forEachExists(screenWrap, this);
    Asteroids_Red.forEachExists(screenWrap, this);
    Asteroids_Red_Med.forEachExists(screenWrap, this);
    Asteroids_Red_Small.forEachExists(screenWrap, this);
}

function AsteroidsCollide (sprite1 , sprite2)
{
    if (sprite1.name.includes("small") || sprite1.name == "laser") {
        sprite1.kill();
    }
    else if (sprite1.name.includes("large")) {
        AsteroidSplitLarge(sprite1);
    }
    else if (sprite1.name.includes("medium")) {
        AsteroidSplitMedium(sprite1);
    }

    if (sprite2.name.includes("small") || sprite2.name == "laser") {
        sprite2.kill();
    }
    else if (sprite2.name.includes("large")) {
        AsteroidSplitLarge(sprite2);
    }
    else if (sprite2.name.includes("medium")) {
        AsteroidSplitMedium(sprite2);
    }
}

function AsteroidSplitLarge (sprite)
{
    if (sprite.name.includes("grey")) {
        Asteroid = Asteroids_Grey_Med.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = Math.random() * ((sprite.rotation + Math.PI / 4) - (sprite.rotation - Math.PI / 4)) + (sprite.rotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = sprite.body.speed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        Asteroid = Asteroids_Grey_Med.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = newRotation + Math.random() * ((newRotation + Math.PI / 4) - (newRotation - Math.PI / 4)) + (newRotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = Math.random() * ((newSpeed + 100) - (newSpeed - 100)) + (newSpeed - 100);
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        sprite.kill();
    }
    else if (sprite.name.includes("red")) {
        Asteroid = Asteroids_Red_Med.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = Math.random() * ((sprite.rotation + Math.PI / 4) - (sprite.rotation - Math.PI / 4)) + (sprite.rotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = sprite.body.speed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        Asteroid = Asteroids_Red_Med.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = newRotation + Math.random() * ((newRotation + Math.PI / 4) - (newRotation - Math.PI / 4)) + (newRotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = Math.random() * ((newSpeed + 100) - (newSpeed - 100)) + (newSpeed - 100);
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        sprite.kill();
    }
}

function AsteroidSplitMedium (sprite)
{
    if (sprite.name.includes("grey")) {
        Asteroid = Asteroids_Grey_Small.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = Math.random() * ((sprite.rotation + Math.PI / 4) - (sprite.rotation - Math.PI / 4)) + (sprite.rotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = sprite.body.speed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        Asteroid = Asteroids_Grey_Small.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = newRotation + Math.random() * ((newRotation + Math.PI / 4) - (newRotation - Math.PI / 4)) + (newRotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = Math.random() * ((newSpeed + 100) - (newSpeed - 100)) + (newSpeed - 100);
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        sprite.kill();
    }
    else if (sprite.name.includes("red")) {
        Asteroid = Asteroids_Red_Small.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = Math.random() * ((sprite.rotation + Math.PI / 4) - (sprite.rotation - Math.PI / 4)) + (sprite.rotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = sprite.body.speed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        Asteroid = Asteroids_Red_Small.getFirstExists(false);
        Asteroid.reset(sprite.x, sprite.y);

        var newRotation = newRotation + Math.random() * ((newRotation + Math.PI / 4) - (newRotation - Math.PI / 4)) + (newRotation - Math.PI / 4);
        Asteroid.rotation = newRotation;

        var newSpeed = Math.random() * ((newSpeed + 100) - (newSpeed - 100)) + (newSpeed - 100);
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        sprite.kill();
    }
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