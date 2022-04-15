class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, moveSpeed, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.points = pointValue;
        if (moveSpeed == 0) {
            this.moveSpeed = game.settings.spaceshipSpeed;
        }
        else {
            this.moveSpeed = moveSpeed;
        }

        this.direction = direction;
        console.log(this.moveSpeed);
    }


    update() {
        //moving the spaceship
        this.x += this.moveSpeed;
        console.log(this.x);
        // wrap around the screen when crossed
        if(this.direction == 0) {
            if (this.x <= 0 - this.width) {
                    this.reset();
                }
        }
        else if (this.direction == 1) {
            if (this.x >= game.config.width) {
                this.reset();
            }
        }
    }
    


    // reset position when destroyed
    reset() {
        if(this.direction == 0) {
            this.x = game.config.width;
        }
        else if(this.direction == 1) {
            this.x = 0 - this.width;
        }
    }
}