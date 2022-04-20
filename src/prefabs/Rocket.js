//Prefab for the rocket player projectile thing
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player, boat) {
        super(scene, x, y, texture, frame);

        //this will add the new object to the scene
        scene.add.existing(this);
        this.boat = boat;
        this.isFiring = false;
        this.moveSpeed = 2;
        this.player = player;

        // adding rocket sounds
        this.sfx_throw1 = scene.sound.add('sfx_throw1');
        this.sfx_throw2 = scene.sound.add('sfx_throw2');
        this.sfx_throw3 = scene.sound.add('sfx_throw3');
    }

    update() {
        // the left & right movement
        if(!this.isFiring) {
            this.x = this.boat.x;
        }

        // SOLO / PLAYER 1 FIRING CONTROLS
        if (this.player == 0 || this.player == -1) {
            //firing button
            if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                this.isFiring = true;
                this.sfxThrow();
            }
            //if firing, travel upwards
            if (this.isFiring && this.y >= borderPadding) {
                this.y -= 5 * this.moveSpeed;
            }
            // reset if it misses
            if (this.y <= borderPadding) {
                this.isFiring = false;
                this.reset();
            }
        }
        // PLAYER 2 FIRING CONTROLS
        else if (this.player == 1) {
            if (Phaser.Input.Keyboard.JustDown(keyP) && !this.isFiring) {
                this.isFiring = true;
                this.sfxThrow();
            }
            //if firing, travel upwards
            if (this.isFiring && this.y >= borderPadding) {
                this.y -= 5 * this.moveSpeed;
            }
            // reset if it misses
            if (this.y <= borderPadding) {
                this.isFiring = false;
                this.reset();
            }
        }
    }

    // reset the rocket back
    reset() {
        this.isFiring = false;
        this.x = this.boat.x;
        this.y = game.config.height - 2.5*borderUISize - borderPadding;
    }

    // randomize throwing sound
    sfxThrow() {
        var rand = Math.round(Math.random()*(2));

        if (rand == 0) {
            this.sfx_throw1.play();
        }
        else if (rand == 1) {
            this.sfx_throw2.play();
        }
        else {
            this.sfx_throw3.play();
        }
    }
}