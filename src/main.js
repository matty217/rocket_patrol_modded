let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}



let game = new Phaser.Game(config);

// reserving keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//additional comment so i can update the repo and publish the game on a page :)