// Matthew Hill
// Feeding Time!
// 20 Hours

//60 pts - Asset/Theme Overhaul
//30 pts - Simultaneous 2 Player
//10 pts - Display Time on Screen

//MISC
//randomize enemy speed and direction on reset
//new player character that fires the 'rockets'
//Two Player mode and single player mode both available











let config = {
    type: Phaser.CANVAS,
    width: 840, //640,
    height: 480, //420
    scene: [ Menu, Play, Play2 ]
}


let game = new Phaser.Game(config);

// reserving keyboard variables
let keyR, keyRIGHT, keyLEFT, keyP, keyA, keyD, keyF, keyUP;

let borderUISize = 40;
let borderPadding = borderUISize / 3;

//additional comment so i can update the repo and publish the game on a page :)