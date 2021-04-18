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