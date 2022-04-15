let config = {
    type: Phaser.CANVAS,
    width: 640, //640,
    height: 420, //420
    scene: [ Menu, Play, Play2 ]
}



let game = new Phaser.Game(config);

// reserving keyboard variables
let keyR, keyRIGHT, keyLEFT, keyP, keyA, keyD, keyF, keyUP;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//additional comment so i can update the repo and publish the game on a page :)