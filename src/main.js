/*
Neo Zhang
Rocket Patrol Mod
April 17, 2021
25.3 Hours

Point BreakDown:
* (30) Implement a simultaneous two-player mode
* (20) Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
* (20) Create new artwork for all of the in-game assets (rocket, spaceships, explosion)
* (20) Implement a new timing/scoring mechanism that adds time to the clock for successful hits
* (10) Display the time remaining (in seconds) on the screen

What's been changed:
The menu has been given a new touch up. The background, instead of a plain black background, it now has a moving stars
and a png image that gives player a better view of what the game is and what to do.
Instead of doing an easy/hard mode, I changed it to single or co-op player mode. The difference between the mode aside
from how many players there are, the amount of time is different. Because when hitting the spaceship gives you 2 seconds
back, the player has 30 (for single) or 20 (for co-op) seconds.
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play , Play2 ]
}

let game = new Phaser.Game(config); 

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;  // 4 pixel per fram

let keyONE, keyTWO;

let keyUP, keyR, keyLEFT, keyRIGHT;
let keyW, keyA, keyD;