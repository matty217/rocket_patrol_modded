//Prefab for the rocket player projectile thing
class Boat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame);

        //this will add the new object to the scene
        scene.add.existing(this);
        this.moveSpeed = 2;
        this.player = player;
    }

    update() {
        // set the speed of the rocket to increase with score ?
        // the left & right movement
        if (this.player == -1) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= 3 * this.moveSpeed;
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += 3 * this.moveSpeed;
            }
        }
        else if (this.player == 0) {
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
}