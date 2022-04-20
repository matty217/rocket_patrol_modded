class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // this is for loading the images/tile sprites
        this.load.image('rocket', './assets/meat.png');
        this.load.image('spaceship', './assets/ally.png');
        this.load.image('water', './assets/water2.png');
        this.load.image('boat', './assets/boat.png');
        this.load.image('foreground', './assets/foreground.png');
        this.load.image('parasol', './assets/parasol.png');
        this.load.image('pole', './assets/pole.png');
        this.load.image('beam', './assets/beam.png');
        this.load.image('plaque', './assets/plaque.png');
        this.load.bitmapFont('command', './assets/carrier_command.png', 'assets/carrier_command.xml');

        this.load.spritesheet('explosion', './assets/gator_eat.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4});
    }

    create() {
        // places the tile sprite (background)
        this.water = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'water').setOrigin(0, 0);

        // adding meat and boat 1
        this.p1Boat = new Boat(this, game.config.width/3, game.config.height - 2*borderUISize - borderPadding, 'boat', 0, 0).setOrigin(0.5, 0);

        this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - 2.5*borderUISize - borderPadding, 'rocket', 0, 0, this.p1Boat).setOrigin(0.5, 0);
        this.p1Rocket.scale = 1;

        // adding in the spaceship enemies
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, game.config.height*2/8, 'spaceship', 0, 30, 4, 1).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, game.config.height*3/8, 'spaceship', 0, 20, -3, 0).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, game.config.height*4/8, 'spaceship', 0, 10, -4, 0).setOrigin(0,0);

        // adds the borders
        this.add.sprite(game.config.width / 2, 0, 'parasol').setOrigin(0.5, 0);
        this.add.sprite(0, game.config.height/2, 'pole').setOrigin(0, 0.5);
        this.add.sprite(game.config.width - borderUISize, game.config.height/2, 'pole').setOrigin(0, 0.5);
        this.add.sprite(game.config.width/2, game.config.height - borderUISize, 'beam').setOrigin(0.5, 0);
        this.add.sprite(game.config.width/2, game.config.height - borderUISize, 'plaque').setOrigin(0.5, 0);


        //this.add.sprite(0, 0, 'foreground').setOrigin(0, 0);

        // flipping the sprite depending if they are traveling to the right or not.
        if (this.ship01.direction == 1) {
            this.ship01.flipX = true;
        }
        if (this.ship02.direction == 1) {
            this.ship02.flipX = true;
        }
        if (this.ship03.direction == 1) {
            this.ship03.flipX = true;
        }

        // optionally changing the size of the "enemy" sprites
        this.ship01.scale = 1;
        this.ship02.scale = 1;
        this.ship03.scale = 1;

        // defining each of the keys here
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //PLAYER 1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation configurations
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 4, first: 0}),
            frameRate: 10
        });

        // score keeping - set score to 0
        this.p1Score = 0;

        // displaying the score
        let scoreConfig = {
            fontFamily: "Lucida Console",
            fontSize: '26px',
            backgroundColor: '#679b2b',
            color: '#3b6906',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 65
        }
        this.scoreLeft = this.add.text(borderUISize *2.2, borderUISize / 2, this.p1Score, scoreConfig);

        // game over trigger
        this.gameOver = false;
        
        // setting the game length to 60 seconds
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height * 1/3, 'Feeding Complete!', scoreConfig).setOrigin(0.5);
            this.winText = this.add.text(game.config.width/2, game.config.height * 1/2, "Score: " + this.p1Score, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to return to the Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // displaying the clock
        let clockConfig = {
            fontFamily: "Lucida Console",
            fontSize: '28px',
            backgroundColor: '#679b2b',
            color: '#3b6906',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 65
        }
        this.clockTime = game.settings.gameTimer / 1000;
        this.clock = this.add.text(game.config.width - 2.2 * borderUISize, borderUISize / 2, this.clockTime + 's', clockConfig).setOrigin(1,0);

        //play background music
        this.backgroundMusic = game.sound.add('background_music');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

    }

    //called every tick
    update() {

        // check for restart input
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.backgroundMusic.stop();
            this.scene.restart();
        }

        //check for returning menu selection
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (this.gameOver == false) {
            this.water.tilePositionX -= 3;
        }

        // update the time on the clock
        if (this.clockTime >= 1) {
            this.clockTime -= (1/60);
            this.clock.setText(Math.floor(this.clockTime) + 's');
        }

        // adding background music

        if (!this.gameOver) {
            // update rocket
            this.p1Rocket.update();
            this.p1Boat.update();
        
            // update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        // checking collisions (once for each ship)

        //added that the ship can only collide if the ship is visible

        // PLAYER 1 COLLISION
        if (this.checkCollision(this.p1Rocket, this.ship03) && this.ship03.alpha != 0) {
            // console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02) && this.ship02.alpha != 0) {
            // console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01) && this.ship01.alpha != 0) {
            // console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.p1Rocket, this.ship01);
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

    //check which direction the sprite is facing to play correct animation
    if (ship.direction == 1) {
        boom.flipX = true;
    }

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



    // play exploding sound
    this.sfxChomp();
}

sfxChomp() {
    var rand = Math.round(Math.random());
    if (rand == 0) {
        this.sound.play('sfx_chomp1');
    }
    else {
        this.sound.play('sfx_chomp2');
    }
}

}