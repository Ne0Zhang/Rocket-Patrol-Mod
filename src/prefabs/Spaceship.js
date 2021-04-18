class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speedValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add tp existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed * speedValue;        // pixels per frame
        this.width = 64;
        this.height = 40;
    }

    update(position) {
        // move spaceship left 
        this.x -= this.moveSpeed;

        // wrap around from left to right edge
        if (this.x <= 0 - this.width) {
            this.reset(position);
        }
    }

    // position reset
    reset(position) {
        this.x = game.config.width;
        this.y = position;
    }
}