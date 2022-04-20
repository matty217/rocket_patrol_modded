class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // loading audio
        this.load.audio('sfx_select1', './assets/click1.wav');
        this.load.audio('sfx_select2', './assets/click2.wav');
        this.load.audio('sfx_chomp1', './assets/chomp1.wav');
        this.load.audio('sfx_chomp2', './assets/chomp2.wav');
        this.load.audio('sfx_throw1', './assets/plop1.wav');
        this.load.audio('sfx_throw2', './assets/plop2.wav');
        this.load.audio('sfx_throw3', './assets/plop3.wav');
        this.load.audio('background_music', './assets/wholesome.wav');
    }


    create() {
        // menu text stuff
        let menuConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '52px',
            backgroundColor: '#00DCC6',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text
        this.add.rectangle(0,0,game.config.width, game.config.height, 0x009ADC).setOrigin(0,0);
        this.add.text(game.config.width/2, game.config.height* 1/5, 'Feeding Time!', menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '28px';
        this.add.text(game.config.width* 1/4, game.config.height/2-50, 'Player 1', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width* 3/4, game.config.height/2-50, 'Player 2', menuConfig).setOrigin(0.5);

        menuConfig.align = "left";
        this.add.text(game.config.width * 1/4, game.config.height/2, 'A-D: Move\n(F): Fire', menuConfig).setOrigin(0.5);

        menuConfig.align = "right";
        this.add.text(game.config.width * 3/4, game.config.height/2, 'Move: ←→\nFire: (P)', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 3, 'Solo: Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 4, 'Press ↑ for Multiplayer', menuConfig).setOrigin(0.5);

        // defining keys to use
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // novice mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select1');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 5,
                gameTimer: 45000
            }
            this.sound.play('sfx_select1');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            // multiplayer mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx_select1');
            this.scene.start('playScene2');
        }
    }

    sfxSelect() {
        var rand = Math.round(Math.random()*(2));
        console.log(rand);

        if (rand == 0) {
            this.sound.play('sfx_select1');
        }
        else {
            this.sound.play('sfx_select2');
        }
    }
}