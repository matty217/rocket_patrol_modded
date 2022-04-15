//Prefab for the rocket player projectile thing
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame);

        //this will add the new object to the scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.player = player;

        // adding rocket sounds
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // set the speed of the rocket to increase with score ?

        // the left & right movement
        if(!this.isFiring) {
            if (this.player == 0) {
                if(keyA.isDown && this.x >= borderUISize + this.width) {
                    this.x -= 3 * this.moveSpeed;
                }
                else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += 3 * this.moveSpeed;
                }
            }
            else if (this.player == 1) {
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= 3 * this.moveSpeed;
                }
                else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += 3 * this.moveSpeed;
                }
            }
        }

        // PLAYER 1 FIRING CONTROLS
        if (this.player == 0) {
            //firing button
            if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
            //if firing, travel upwards
            if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= 6 * this.moveSpeed;
            }
            // reset if it misses
            if (this.y <= borderUISize * 3 + borderPadding) {
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding;
            }
        }
        // PLAYER 2 FIRING CONTROLS
        else if (this.player == 1) {
            if (Phaser.Input.Keyboard.JustDown(keyP) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
            //if firing, travel upwards
            if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= 6 * this.moveSpeed;
            }
            // reset if it misses
            if (this.y <= borderUISize * 3 + borderPadding) {
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding;
            }
        }
    }

    // reset the rocket back
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}