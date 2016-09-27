
function screenWrap(sprite, offset) {

    if (sprite.x < -offset ) {
        sprite.x = game.width ;
    }
    else if (sprite.x > game.width + offset) {
        sprite.x = 0;
    }

    if (sprite.y < -offset) {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height + offset) {
        sprite.y = 0;
    }

}