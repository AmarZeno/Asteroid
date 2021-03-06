﻿/// <reference path="../phaser.js" />
/// <reference path="audioManager.js" />

var Asteroid;
var Asteroids_Grey;
var Asteroids_Grey_Med;
var Asteroids_Grey_Small;
var AsteroidTime = 0;
var RandomCreatePosition;

var totalexistingAsteroids = 4;
var maxAsteroids = 12;
var asteroidSpawnTime = 9000;
var lastSpawnTime = 0;
var asteroidDecay = 20000;
var hitEmitter;



AsteroidsLoad = function () {

    game.load.image('Asteroids_Grey', 'Assets/Images/Asteroids_Grey_Large.png');
    game.load.image('Asteroids_Grey_Med', 'Assets/Images/Asteroids_Grey_Med.png');
    game.load.image('Asteroids_Grey_Small', 'Assets/Images/Asteroids_Grey_Small.png');

    // asteroid animations
    game.load.image('dust', 'Assets/Images/smoke-puff.png');
    var totalexistingAsteroids = 18;
}


AsteroidsCreate = function () {

    // Large asteroids
    Asteroids_Grey = game.add.group();
    Asteroids_Grey.enableBody = false;
    Asteroids_Grey.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Grey.createMultiple(totalexistingAsteroids * 4, 'Asteroids_Grey');
    Asteroids_Grey.scale.setTo(1);

    Asteroids_Grey.setAll('anchor.x', 0.5);
    Asteroids_Grey.setAll('anchor.y', 0.5);
    Asteroids_Grey.setAll('name', "large_grey");
    Asteroids_Grey.setAll('canCollide', false);
    Asteroids_Grey.setAll('birthTime', 0);

    // Medium asteroids
    Asteroids_Grey_Med = game.add.group();
    Asteroids_Grey_Med.enableBody = false;
    Asteroids_Grey_Med.physicsBodytype = Phaser.Physics.ARCADE;

    Asteroids_Grey_Med.createMultiple(totalexistingAsteroids * 8, 'Asteroids_Grey_Med');
    Asteroids_Grey_Med.scale.setTo(1);
    Asteroids_Grey_Med.setAll('anchor.x', 0.5);
    Asteroids_Grey_Med.setAll('anchor.y', 0.5);
    Asteroids_Grey_Med.setAll('name', "medium_grey");
    Asteroids_Grey_Med.setAll('canCollide', false);
    Asteroids_Grey_Med.setAll('birthTime', 0);

    // Small asteroids
    Asteroids_Grey_Small = game.add.group();
    Asteroids_Grey_Small.enableBody = false;
    Asteroids_Grey_Small.physicsBodytype = Phaser.Physics.ARCADE;


    Asteroids_Grey_Small.createMultiple(totalexistingAsteroids * 16, 'Asteroids_Grey_Small');
    Asteroids_Grey_Small.scale.setTo(1);
    Asteroids_Grey_Small.setAll('anchor.x', 0.5);
    Asteroids_Grey_Small.setAll('anchor.y', 0.5);
    Asteroids_Grey_Small.setAll('name', "small_grey");
    Asteroids_Grey_Small.setAll('canCollide', false);
    Asteroids_Grey_Small.setAll('birthTime', 0);

    // Start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable([Asteroids_Grey, Asteroids_Grey_Med, Asteroids_Grey_Small]);

    for (var i = 0; i < totalexistingAsteroids; i++) {

        Asteroid = Asteroids_Grey.getFirstExists(false);
        LargeAsteroidSpawn();      
    }

    MakeHitEmitter();
}

function MakeHitEmitter() {

    hitEmitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);
    hitEmitter.makeParticles(['dust']);
    //emitter.gravity = 200;
    hitEmitter.setAlpha(1, 0, 3000);
    hitEmitter.setScale(0.3, 0, 0.3, 0, 3000);
}

AsteroidsUpdate = function () {

    if (game.time.now >= asteroidSpawnTime + lastSpawnTime) {

        lastSpawnTime = game.time.now;
        
        if (asteroidSpawnTime > 2000) {
            asteroidSpawnTime -= 750;
        }

        LargeAsteroidSpawn();
    }

    // Screen wrapping

    Asteroids_Grey.forEachExists(worldWrap, this, 0);
    Asteroids_Grey_Med.forEachExists(worldWrap, this, 0);
    Asteroids_Grey_Small.forEachExists(worldWrap, this, 0);


    // update if asteroids can collide
    Asteroids_Grey.forEachExists(checkBirthTime, this);
    Asteroids_Grey_Med.forEachExists(checkBirthTime, this);
    Asteroids_Grey_Small.forEachExists(checkBirthTime, this);

    // Collisions

    game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey, AsteroidsCollide, null, this);

    game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey, Asteroids_Grey_Small, AsteroidsCollide, null, this);

    game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Grey_Med, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey_Small, Asteroids_Grey_Small, AsteroidsCollide, null, this);
    game.physics.arcade.collide(Asteroids_Grey_Med, Asteroids_Grey_Small, AsteroidsCollide, null, this);

}

function PlayAsteroidEmitter(asteroid, otherAsteroid) {

    var midpoint = Phaser.Point.centroid([asteroid, otherAsteroid]);

    var hitX = midpoint.x;
    var hitY = midpoint.y;

    hitEmitter.emitX = hitX;
    hitEmitter.emitY = hitY;
    hitEmitter.start(true, 500, null, 100);
}

function LargeAsteroidSpawn() {

    Asteroid = Asteroids_Grey.getFirstExists(false);
    Asteroid.revive();

    if (Asteroid != null) {

       // game.debug.body(Asteroid, 'red', false); game.debug.spriteBounds(Asteroid, 'pink', false);

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
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, 250, Asteroid.body.velocity);
        Asteroid.body.bounce.set(1);
        Asteroid.health = 7;
        Asteroid.body.mass = 650;
        Asteroid.birthTime = game.time.now;
    }
}

function AsteroidsCollide(sprite1, sprite2) {

    var sprite1Pos = sprite1.position;
    var sprite2Pos = sprite2.position;

    // Play collide sound
    if (sprite1.name == "ship") {
        playShipCollideSound();
    } else {
        playAsteroidHitSound();

        // Asteroid hit particles
        PlayAsteroidEmitter(sprite1Pos, sprite2Pos);
    }


    // Sprite 1 checks
    if (sprite1.name.includes("small") && sprite1.canCollide) {

        if (sprite1.name.includes("small")) {
            sprite1.health--;
        }

        if (sprite1.health <= 0 || sprite1.name == "laser" || sprite2.name == "laser" || sprite2.name == "ship" || sprite2.name == "sheilds") {
            sprite1.health = 0;
            sprite1.kill();
        }
    }

    else if (sprite1.name.includes("large") && sprite1.canCollide) {

        if (sprite1.name.includes("large")) {
            sprite1.health--;
        }

        if (sprite1.health <= 0 || sprite2.name == "laser" || sprite2.name == "ship" || sprite2.name == "sheilds") {
            sprite1.health = 0;
            AsteroidSplitLarge(sprite1, sprite2);
        }
    }

    else if (sprite1.name.includes("medium") && sprite1.canCollide) {


        if (sprite1.name.includes("medium")) {

            sprite1.health--;
        }

        if (sprite1.health <= 0 || sprite2.name == "laser" || sprite2.name == "ship" || sprite2.name == "sheilds") {
            sprite1.health = 0;
            AsteroidSplitMedium(sprite1, sprite2);
        }
    }

    // Sprite 2 checks
    if ((sprite2.name.includes("small") && sprite2.canCollide) || sprite2.name == "laser") {

        if (sprite2.name.includes("small")) {

            sprite2.health--;
        }

        if (sprite2.health <= 0 || sprite2.name == "laser" || sprite1.name == "laser" || sprite1.name == "ship" || sprite1.name == "sheilds") {
            sprite2.health = 0;
            sprite2.kill();
        }
    }
    else if (sprite2.name.includes("large") && sprite2.canCollide) {


        if (sprite2.name.includes("large")) {

            sprite2.health--;
        }

        if (sprite2.health <= 0 || sprite1.name == "laser" || sprite1.name == "ship" || sprite1.name == "sheilds") {
            sprite2.health = 0;
            AsteroidSplitLarge(sprite2, sprite1);
        }
    }
    else if (sprite2.name.includes("medium") && sprite2.canCollide) {


        if (sprite2.name.includes("medium")) {

            sprite2.health--;
        }

        if (sprite2.health <= 0 || sprite1.name == "laser" || sprite1.name == "ship" || sprite1.name == "sheilds") {
            sprite2.health = 0;
            AsteroidSplitMedium(sprite2, sprite1);
        }
    }
}

function AsteroidSplitLarge(sprite, impactSprite) {
    if (sprite.name.includes("grey")) {
        Asteroid = Asteroids_Grey_Med.getFirstExists(false);
        Asteroid.revive();
        Asteroid.reset(sprite.x, sprite.y);
        Asteroid.birthTime = game.time.now;
        Asteroid.canCollide = false;

        var newRotation = Math.random() * ((impactSprite.rotation + Math.PI / 6) - (impactSprite.rotation - Math.PI / 6)) + (impactSprite.rotation - Math.PI / 6);
        Asteroid.rotation = newRotation;

        var newSpeed = sprite.body.speed;
        Asteroid.speed = newSpeed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);
        Asteroid.body.bounce.set(1);
        Asteroid.body.mass = 300;
        Asteroid.health = 4;

        Asteroid = Asteroids_Grey_Med.getFirstExists(false);
        Asteroid.revive();
        Asteroid.reset(sprite.x, sprite.y);
        Asteroid.birthTime = game.time.now;
        Asteroid.canCollide = false;

        var newRotation = Math.random() * ((newRotation + Math.PI / 6) - (newRotation - Math.PI / 6)) + (newRotation - Math.PI / 6);
        Asteroid.rotation = newRotation;

        var newSpeed = Math.random() * ((newSpeed + 50) - (newSpeed - 25)) + (newSpeed - 25);
        Asteroid.speed = newSpeed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);

        Asteroid.body.bounce.set(1);
        Asteroid.body.mass = 300;
        Asteroid.health = 4;

        sprite.kill();
    }
}

function AsteroidSplitMedium(sprite, impactSprite) {
    if (sprite.name.includes("grey")) {
        Asteroid = Asteroids_Grey_Small.getFirstExists(false);
        Asteroid.revive();
        Asteroid.reset(sprite.x, sprite.y);
        Asteroid.birthTime = game.time.now;
        Asteroid.canCollide = false;

        var newRotation = Math.random() * ((impactSprite.rotation + Math.PI / 6) - (impactSprite.rotation - Math.PI / 6)) + (impactSprite.rotation - Math.PI / 6);
        Asteroid.rotation = newRotation;

        var newSpeed = sprite.body.speed;
        Asteroid.speed = newSpeed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);
        Asteroid.body.bounce.set(1);
        Asteroid.body.mass = 75;
        Asteroid.health = 2;

        Asteroid = Asteroids_Grey_Small.getFirstExists(false);
        Asteroid.revive();
        Asteroid.reset(sprite.x, sprite.y);
        Asteroid.birthTime = game.time.now;
        Asteroid.canCollide = false;

        var newRotation = Math.random() * ((newRotation + Math.PI / 6) - (newRotation - Math.PI / 6)) + (newRotation - Math.PI / 6);
        Asteroid.rotation = newRotation;

        var newSpeed = Math.random() * ((newSpeed + 50) - (newSpeed - 25)) + (newSpeed - 25);
        Asteroid.speed = newSpeed;
        game.physics.arcade.velocityFromRotation(Asteroid.rotation, newSpeed, Asteroid.body.velocity);
        Asteroid.body.bounce.set(1);
        Asteroid.body.mass = 75;
        Asteroid.health = 2;

        sprite.kill();
    }
}

function checkBirthTime(currentAsteroid) {
    if (game.time.now >= currentAsteroid.birthTime + 1000) { // the int value being added represents the amount of time until the asteroid can collide
        currentAsteroid.canCollide = true;
    }
    else if (currentAsteroid.name.includes("small") && game.time.now >= currentAsteroid.birthTime + asteroidDecay) {
        currentAsteroid.pendingDestroy = true;
        currentAsteroid.exists = false;
        Asteroids_Grey_Small.remove(currentAsteroid);
    }
}

function updateParticles() {
    for (var i = 0; i < totalexistingAsteroids; i++) {

        var tempAsteroid = Asteroids_Grey.getFirstExists(false);
        var tempEmitter = emitters.getFirstExists(false);

        if (tempAsteroid != null && tempEmitter != null) {
            var px = tempAsteroid.body.velocity.x;
            var py = tempAsteroid.body.velocity.y;

            px *= -1;
            py *= -1;

            tempEmitter.emitX = tempAsteroid.x;
            tempEmitter.emitY = tempAsteroid.y;

            tempEmitter.minParticleSpeed.set(px, py);
            tempEmitter.maxParticleSpeed.set(px, py);
        }


    }
}



function ShootAsteroids(sprite1, sprite2) {
    if (this.ship.Ispushing == true) {
        sprite2.rotation = sprite1.rotation;
        //sprite2.body.velocity = sprite1.body.force / sprite2.body.mass;
        var pushedspeed = sprite1.body.force / sprite2.body.mass;
        game.physics.arcade.velocityFromRotation(sprite1.rotation, pushedspeed, sprite2.body.velocity);
        sprite1.kill();
    }
}


function worldWrap(thisSprite) {
    game.world.wrap(thisSprite, 150);
}
