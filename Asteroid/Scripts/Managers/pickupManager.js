var NormalPickups;
//var SwitchModePickups;
var totalexistingNormalPickups = 1;
var totalexistingSwitchModePickups = 1;
var NormalPickupsTime = 500;
//var SwitchModePickupsTime = 10000;
var NormalPickup;
var SwitchModePickup;
var pickupTimerText;
var interval = 5000;
var NormalPickupbirthtime = 0;
var first = true;


PickupsLoad = function () {
    game.load.image('NormalPickups', 'Assets/Images/glow circle1.png');
//    game.load.image('SwitchModePickups', 'Assets/Images/bigstar.jpg');
}

PickupsCreate = function ()
{
    NormalPickups = game.add.group();
    NormalPickups.enableBody = true;
    NormalPickups.physicsBodytype = Phaser.Physics.ARCADE;
    
    
   // SwitchModePickups = game.add.group();
  //  SwitchModePickups.enableBody = true;
  //  SwitchModePickups.physicsBodytype = Phaser.Physics.ARCADE;

    NormalPickups.createMultiple(totalexistingNormalPickups, 'NormalPickups');
    NormalPickups.setAll('anchor.x', 0.5);
    NormalPickups.setAll('anchor.y', 0.5);

//    SwitchModePickups.createMultiple(totalexistingSwitchModePickups, 'SwitchModePickups');
 //   SwitchModePickups.setAll('anchor.x', 0.5);
 //   SwitchModePickups.setAll('anchor.y', 0.5);
}

NormalPickupsUpdate = function ()
{
    if (game.time.now > NormalPickupsTime)
    {
        NormalPickup = NormalPickups.getFirstExists(false);

        if (NormalPickup)
        {
            var pickupPositionX = Math.random() * game.width ;
            var pickupPositionY = Math.random() * game.height;
            if (pickupPositionX < NormalPickup.width / 2 || pickupPositionX > (game.width - NormalPickup.width / 2) ||
                pickupPositionY < NormalPickup.height / 2 || pickupPositionY > (game.height - NormalPickup.height / 2))
                return;
            NormalPickup.reset(pickupPositionX, pickupPositionY);
            pickupTimerText = game.add.text(pickupPositionX, pickupPositionY, "", { font: "70px Verdana", fill: "#ffffff", align: "left" });
            pickupTimerText.anchor.set(0.5);
            pickupTimerText.lifespan = interval;
            NormalPickup.lifespan = interval;
            NormalPickupsTime = game.time.now + interval;
            NormalPickupbirthtime = game.time.now;
            NormalPickup.body.setCircle(NormalPickup.width / 3, NormalPickup.width / 6, NormalPickup.height / 6);
            game.debug.body(NormalPickup, 'red', false); game.debug.spriteBounds(this.NormalPickup, 'pink', false);
            pickupTimerText.setText("5");

            // Hack to fix the first misaligned collision
            if (first == true) {
                NormalPickup.kill();
                pickupTimerText.kill();
                NormalPickupsTime = game.time.now;
                first = false;
            }
        }
    }
    else 
    {
        NormalPickup = NormalPickups.getFirstExists(true);
        if (game.time.now >= NormalPickupbirthtime + interval)
            pickupTimerText.kill();
        else if (game.time.now >= NormalPickupbirthtime + interval * 4 / 5 )
            pickupTimerText.setText("1");
        else if (game.time.now >= NormalPickupbirthtime + interval * 3 / 5)
            pickupTimerText.setText("2");
        else if (game.time.now >= NormalPickupbirthtime + interval * 2 / 5)
            pickupTimerText.setText("3");
        else if (game.time.now >= NormalPickupbirthtime + interval / 5)
            pickupTimerText.setText("4");
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

function EatingNormalPickups(sprite1, sprite2)
{
    sprite2.kill();
    updateUI(100);
    NormalPickupsTime = game.time.now;
    pickupTimerText.kill();
    increaseCurrentHealth();
}

function EatingSwitchModePickups(sprite1,sprite2)
{
    sprite2.kill();
    if(this.ship.Ispushing)
        this.ship.Ispushing = false;
    else
        this.ship.Ispushing = true;
}