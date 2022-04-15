class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    preload() {
        // this is for loading the images/tile sprites
        this.load.image('rocket', './assets/gator.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/water.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // places the tile sprite (background)
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // this sets a green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // adds the white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.winner;

        // adding the rocket 1
        this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding, 'rocket', 0, 0).setOrigin(0.5, 0);
        this.p1Rocket.scale = 4;

        // adding the rocket 2
        this.p2Rocket = new Rocket(this, game.config.width * 2/3, game.config.height - borderUISize - borderPadding, 'rocket', 0, 1).setOrigin(0.5, 0);
        this.p2Rocket.scale = 4;

        // adding in the spaceship enemies
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, 6, 1).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, -8, 0).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 0, 0).setOrigin(0,0);


        // defining each of the keys here
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //PLAYER 1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //PLAYER 2
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation configurations
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // score keeping - set score to 0
        this.p1Score = 0;
        this.p2Score = 0;

        // displaying the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFB141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig); 
        this.scoreRight = this.add.text(game.config.width - 4.5 * borderUISize - borderPadding, borderUISize + borderPadding * 2, this.p2Score, scoreConfig); 

        // game over trigger
        this.gameOver = false;
        
        // setting the game length to 60 seconds
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height * 1/3, 'GAMA OVAR', scoreConfig).setOrigin(0.5);
            this.winText = this.add.text(game.config.width/2, game.config.height * 1/2, "Placeholder Text", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- fr Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    //called every tick
    update() {

        // check for restart input
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        //check for returning menu selection
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 5;

        //set which player won
        if (this.gameOver) {
            if (this.p1Score == this.p2Score) {
                this.winText.setText("Both Players Win!");
            }
            else {
                if (this.p1Score > this.p2Score) {
                    this.winText.setText('Player 1 Wins!');
                }
                else {
                    this.winText.setText('Player 2 Wins!');
                }
            }
        }

        if (!this.gameOver) {
            // update rocket
            this.p1Rocket.update();
            this.p2Rocket.update();
        
            // update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        // checking collisions (once for each ship)

        // PLAYER 1 COLLISION
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            // console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            // console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            // console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
        }

        // PLAYER 2 COLLISION
        if (this.checkCollision(this.p2Rocket, this.ship03)) {
            // console.log('kaboom ship 03');
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            // console.log('kaboom ship 02');
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            // console.log('kaboom ship 01');
            this.p2Rocket.reset();
            this.shipExplode(this.p2Rocket, this.ship01);
        }
    }


    // collision detector
    checkCollision(rocket, ship) {
        // simple AABB checking or whatever that is
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        }
        else {
                return false;
            }
    }

// exploding ship
shipExplode(rocket, ship) {
    // hide the ship
    ship.alpha = 0;
    // create the explosion sprite where the ship used to be
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');                                                 // this plays the exploding animation
    boom.on('animationcomplete', () => {                                        // calls back after the animation is done
        ship.reset();                                                           // resets the ship
        ship.alpha = 1;                                                         // sets the ship back to visible
        boom.destroy();                                                         // gets rid of the exploding animation
    });
    // adding to the score
    if (rocket.player == 0) {
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
    if (rocket.player == 1) {
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
    }

    // play exploding sound
    this.sound.play('sfx_explosion');
}

}