class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }


    update() {
        //moving the spaceship left
        this.x -= this.moveSpeed;
        // wrap around the screen when crossed
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }


    // reset position when destroyed
    reset() {
        this.x = game.config.width;
    }
}