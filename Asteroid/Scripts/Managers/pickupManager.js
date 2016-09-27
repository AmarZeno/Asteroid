var NormalPickups;
var SwitchModePickups;
var totalexistingNormalPickups = 5;
var totalexistingSwitchModePickups = 1;
var NormalPickupsTime = 0;
var SwitchModePickupsTime = 10000;
var NormalPickup;
var SwitchModePickup;

PickupsLoad = function () {
    game.load.image('NormalPickups', 'Assets/Images/star.jpg');
    game.load.image('SwitchModePickups', 'Assets/Images/bigstar.jpg');
}

PickupsCreate = function ()
{
    NormalPickups = game.add.group();
    NormalPickups.enableBody = true;
    NormalPickups.physicsBodytype = Phaser.Physics.ARCADE;

    SwitchModePickups = game.add.group();
    SwitchModePickups.enableBody = true;
    SwitchModePickups.physicsBodytype = Phaser.Physics.ARCADE;

    NormalPickups.createMultiple(totalexistingNormalPickups, 'NormalPickups');
    NormalPickups.setAll('anchor.x', 0.5);
    NormalPickups.setAll('anchor.y', 0.5);

    SwitchModePickups.createMultiple(totalexistingSwitchModePickups, 'SwitchModePickups');
    SwitchModePickups.setAll('anchor.x', 0.5);
    SwitchModePickups.setAll('anchor.y', 0.5);
}

NormalPickupsUpdate = function ()
{
    if (game.time.now > NormalPickupsTime)
    {
        NormalPickup = NormalPickups.getFirstExists(false);

        if (NormalPickup)
        {
            NormalPickup.reset(Math.random() * game.width, Math.random() * game.height);
            NormalPickup.lifespan = 60000;
            NormalPickupsTime = game.time.now + 2000;
        }
    }
}

SwitchModePickupsUpdate = function ()
{
    if (game.time.now > SwitchModePickupsTime) {
        NormalPickup = SwitchModePickups.getFirstExists(false);

        if (NormalPickup) {
            NormalPickup.reset(Math.random() * game.width, Math.random() * game.height);
            NormalPickup.lifespan = 60000;
            NormalPickupsTime = game.time.now + 10000;
        }
    }
}

function EatingNormalPickups(sprite1,sprite2)
{
    sprite2.kill();
    updateUI(100);
}

function EatingSwitchModePickups(sprite1,sprite2)
{
    sprite2.kill();
    if(this.ship.Ispushing)
        this.ship.Ispushing = false;
    else
        this.ship.Ispushing = true;
}