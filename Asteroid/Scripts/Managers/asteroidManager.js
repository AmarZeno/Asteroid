﻿/// <reference path="../phaser.js" />

var Asteroid;
var Asteroids_Grey;
var Asteroids_Grey_Med;
var Asteroids_Grey_Small;
var AsteroidTime = 0;
var RandomCreatePosition;
var totalexistingAsteroids = 10;
var asteroidTimeOut = 10000;


AsteroidsLoad = function () {
    game.load.image('Asteroids_Grey', 'Assets/Images/Asteroids_Grey.png');

    // Temp file names for medium sized asteroids
    game.load.image('Asteroids_Grey_Med', 'Assets/Images/Asteroids_Grey_Med.png');

    // Temp file names for small sized asteroids
    game.load.image('Asteroids_Grey_Small', 'Assets/Images/Asteroids_Grey_Small.png');
    var totalexistingAsteroids = 8;
}


AsteroidsLoad = function () {
    game.load.image('Asteroids_Grey', 'Assets/Images/Asteroids_Grey_Large.png');
 //   game.load.image('Asteroids_Red', 'Assets/Images/Asteroids_Red.png');

    // Temp file names for medium sized asteroids
    game.load.image('Asteroids_Grey_Med', 'Assets/Images/Asteroids_Grey_Med.png');
 //   game.load.image('Asteroids_Red_Med', 'Assets/Images/Asteroids_Red_Med.png');

    // Temp file names for small sized asteroids
    game.load.image('Asteroids_Grey_Small', 'Assets/Images/Asteroids_Grey_Small.png');
  //  game.load.image('Asteroids_Red_Small', 'Assets/Images/Asteroids_Red_Small.png');

    // Load a particle effect for collisions?
}

/*AsteroidsCreate = function ()
{
    Asteroid = game.add.sprite(1920, 1080, 'Asteroids');
    Asteroid.anchor.set(0.5);
}*/

AsteroidsCreate = function () {
    // Large asteroids
    Asteroids_Grey = game.add.group();
    Asteroids_Grey.enableBody = false;
    Asteroids_Grey.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Grey.createMultiple(totalexistingAsteroids, 'Asteroids_Grey');
    Asteroids_Grey.scale.setTo(1.5);
    Asteroids_Grey.setAll('anchor.x', 0.5);
    Asteroids_Grey.setAll('anchor.y', 0.5);
    Asteroids_Grey.setAll('name', "large_grey");
    Asteroids_Grey.setAll('canCollide', false);
    Asteroids_Grey.setAll('birthTime', 0);


    // Medium asteroids
    Asteroids_Grey_Med = game.add.group();
    Asteroids_Grey_Med.enableBody = false;
    Asteroids_Grey_Med.physicsBodytype = Phaser.Physics.ARCADE;


    Asteroids_Grey_Med.createMultiple(totalexistingAsteroids * 2, 'Asteroids_Grey_Med');
    Asteroids_Grey_Med.scale.setTo(2);
    Asteroids_Grey_Med.setAll('anchor.x', 0.5);
    Asteroids_Grey_Med.setAll('anchor.y', 0.5);
    Asteroids_Grey_Med.setAll('name', "medium_grey");
    Asteroids_Grey_Med.setAll('canCollide', false);
    Asteroids_Grey_Med.setAll('birthTime', 0);

    // Small asteroids
    Asteroids_Grey_Small = game.add.group();
    Asteroids_Grey_Small.enableBody = false;
    Asteroids_Grey_Small.physicsBodytype = Phaser.Physics.ARCADE;


    Asteroids_Grey_Small.createMultiple(totalexistingAsteroids * 4, 'Asteroids_Grey_Small');
    Asteroids_Grey_Small.scale.setTo(3);
    Asteroids_Grey_Small.setAll('anchor.x', 0.5);
    Asteroids_Grey_Small.setAll('anchor.y', 0.5);
    Asteroids_Grey_Small.setAll('name', "small_grey");
    Asteroids_Grey_Small.setAll('canCollide', false);
    Asteroids_Grey_Small.setAll('birthTime', 0);

    // Start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable([Asteroids_Grey, Asteroids_Grey_Med, Asteroids_Grey_Small]);

    for (var i = 0; i < totalexistingAsteroids; i++) {

        //if (game.time.now > AsteroidTime) {

        Asteroid = Asteroids_Grey.getFirstExists(false);
       // var AsteroidsType = Math.random() * 2;

      //  if (AsteroidsType >= 0 && AsteroidsType < 1)
            Asteroid = Asteroids_Grey.getFirstExists(false);
      //  else
          //  Asteroid = Asteroids_Red.getFirstExists(false);

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
            game.physics.arcade.velocityFromRotation(Asteroid.rotation, 375, Asteroid.body.velocity);
            Asteroid.body.bounce.set(1);
            Asteroid.body.mass = 500;
            Asteroid.health = 6;
            Asteroid.scale.setTo(1.5);
            game.physics.arcade.velocityFromRotation(Asteroid.rotation, 200, Asteroid.body.velocity);
            Asteroid.body.bounce.set(1);
            Asteroid.health = 8;
           // Asteroid.scale.setTo(0.5);
            Asteroid.birthTime = game.time.now;
            //    AsteroidTime = game.time.now + 200;
            //}
        }
    }
}

AsteroidsUpdate = function () {

    // Collisions

    game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey, AsteroidsCollide, null, this);

    game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey_Small, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Grey, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey_Small, Asteroids_Grey, AsteroidsCollide, null, this);

    game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey_Small, Asteroids_Grey_Small, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Grey_Small, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey_Small, Asteroids_Grey_Med, AsteroidsCollide, null, this);


    // Screen wrapping
    Asteroids_Grey.forEachExists(screenWrap, this, 0);
    Asteroids_Grey_Med.forEachExists(screenWrap, this, 0);
    Asteroids_Grey_Small.forEachExists(screenWrap, this, 0);

    // update if asteroids can collide
    Asteroids_Grey.forEachExists(checkBirthTime, this);
    Asteroids_Grey_Med.forEachExists(checkBirthTime, this);
    Asteroids_Grey_Small.forEachExists(checkBirthTime, this);

}

function AsteroidsCollide(sprite1, sprite2) {

    if ((sprite1.name.includes("small") && sprite1.canCollide) || sprite1.name == "laser") {

        if (sprite1.name.includes("small")) {
            sprite1.health--;
        }

        if (sprite1.health <= 0 || sprite1.name == "laser" || sprite2.name == "laser") {
            sprite1.health = 0;
            sprite1.kill();
        }
    }
    else if (sprite1.name.includes("large") && sprite1.canCollide) {

        if (sprite1.name.includes("large")) {
            sprite1.health--;
        }

        if (sprite1.health <= 0 || sprite2.name == "laser") {
            sprite1.health = 0;
            AsteroidSplitLarge(sprite1);
        }
    }
    else if (sprite1.name.includes("medium") && sprite1.canCollide) {

        if (sprite1.name.includes("medium")) {
            sprite1.health--;
        }

        if (sprite1.health <= 0 || sprite2.name == "laser") {
            sprite1.health = 0;
            AsteroidSplitMedium(sprite1);
        }
    }

    if ((sprite2.name.includes("small") && sprite2.canCollide) || sprite2.name == "laser") {

        if (sprite2.name.includes("small")) {
            sprite2.health--;
        }

        if (sprite2.health <= 0 || sprite2.name == "laser" || sprite1.name == "laser") {
            sprite2.health = 0;
            sprite2.kill();
        }
    }
    else if (sprite2.name.includes("large") && sprite2.canCollide) {

        if (sprite2.name.includes("large")) {
            sprite2.health--;
        }

        if (sprite2.health <= 0 || sprite1.name == "laser") {
            sprite2.health = 0;
            AsteroidSplitLarge(sprite2);
        }
    }
    else if (sprite2.name.includes("medium") && sprite2.canCollide) {

        if (sprite2.name.includes("medium")) {
            sprite2.health--;
        }

        if (sprite2.health <= 0 || sprite1.name == "laser") {
            sprite2.health = 0;
            AsteroidSplitMedium(sprite2);
        }
    }
}

function AsteroidSplitLarge(sprite) {
    Asteroid = Asteroids_Grey_Med.getFirstExists(false);
    Asteroid.reset(sprite.x, sprite.y);
    Asteroid.birthTime = game.time.now;

    var newRotation = Math.random() * ((sprite.rotation + Math.PI / 4) - (sprite.rotation - Math.PI / 4)) + (sprite.rotation - Math.PI / 4);
    Asteroid.rotation = newRotation;

    var newSpeed = sprite.body.speed;
    game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);
    Asteroid.body.bounce.set(1);
    Asteroid.body.mass = 200;
    Asteroid.health = 3;
    Asteroid.scale.setTo(1.7);

    Asteroid = Asteroids_Grey_Med.getFirstExists(false);
    Asteroid.reset(sprite.x, sprite.y);
    Asteroid.birthTime = game.time.now;

    var newRotation = newRotation + Math.random() * ((newRotation + Math.PI / 4) - (newRotation - Math.PI / 4)) + (newRotation - Math.PI / 4);
    Asteroid.rotation = newRotation;

    var newSpeed = Math.random() * ((newSpeed + 100) - (newSpeed - 100)) + (newSpeed - 100);
    game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);
    Asteroid.body.bounce.set(1);
    Asteroid.body.mass = 200;
    Asteroid.health = 3;
    Asteroid.scale.setTo(1.7);

    sprite.kill();
   
}

function AsteroidSplitMedium(sprite) {
    Asteroid = Asteroids_Grey_Small.getFirstExists(false);
    Asteroid.reset(sprite.x, sprite.y);
    Asteroid.birthTime = game.time.now;

    var newRotation = Math.random() * ((sprite.rotation + Math.PI / 4) - (sprite.rotation - Math.PI / 4)) + (sprite.rotation - Math.PI / 4);
    Asteroid.rotation = newRotation;

    var newSpeed = sprite.body.speed;
    game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);
    Asteroid.body.bounce.set(1);
    Asteroid.body.mass = 50;
    Asteroid.health = 2;
    Asteroid.scale.setTo(2);

    Asteroid = Asteroids_Grey_Small.getFirstExists(false);
    Asteroid.reset(sprite.x, sprite.y);
    Asteroid.birthTime = game.time.now;

    var newRotation = newRotation + Math.random() * ((newRotation + Math.PI / 4) - (newRotation - Math.PI / 4)) + (newRotation - Math.PI / 4);
    Asteroid.rotation = newRotation;

    var newSpeed = Math.random() * ((newSpeed + 100) - (newSpeed - 100)) + (newSpeed - 100);
    game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);
    Asteroid.body.bounce.set(1);
    Asteroid.body.mass = 50;
    Asteroid.health = 2;
    Asteroid.scale.setTo(2);

    sprite.kill();

}

function checkBirthTime(currentAsteroid) {

    if (game.time.now >= currentAsteroid.birthTime + 750) { // the int value being added represents the amount of time until the asteroid can collide
        currentAsteroid.canCollide = true;
    }

   if (currentAsteroid.name.includes("small") && game.time.now >= currentAsteroid.birthTime + asteroidTimeOut) {
       currentAsteroid.kill();
   }
}