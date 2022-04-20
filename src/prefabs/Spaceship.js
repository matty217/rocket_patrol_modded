class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, moveSpeed, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.extraSpeed = game.settings.spaceshipSpeed;
        this.moveSpeed = moveSpeed;

        this.direction = direction;
    }


    update() {
        //moving the spaceship
        this.x += this.moveSpeed;
        // wrap around the screen when crossed
        if(this.direction == 0) {
            this.flipX = false;
            if (this.x <= 0 - this.width) {
                    this.reset();
                }
        }
        else if (this.direction == 1) {
            this.flipX = true;
            if (this.x >= game.config.width) {
                this.reset();
            }
        }

        // set it to face forwards


    }
    


    // reset position when destroyed
    reset() {
        // this.moveSpeed = Math.round(Math.random() * 5) + 2;
        this.direction = Math.round(Math.random());                                 //randomize direction
        if(this.direction == 0) {
            this.x = game.config.width;
            this.moveSpeed = -((Math.round(Math.random() * 5) + this.extraSpeed));      //randomize speed
        }
        else {
            this.x = 0 - this.width;
            this.moveSpeed = (Math.round(Math.random() * 5) + this.extraSpeed);       //randomize speed
        }
    }
}