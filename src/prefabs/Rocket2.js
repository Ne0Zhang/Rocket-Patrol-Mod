class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene.
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 4;
        this.width = 20;
        this.height = 30;

         // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    } 

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - 
                this.width) {
                    this.x += this.moveSpeed;
            }
        }

        // Fire Button
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
            this.isFiring = true;
            
            //play sfx
            this.sfxRocket.play();
          }

        // if fired,move trhe rocket up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }

        
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding * 4;
    }
}