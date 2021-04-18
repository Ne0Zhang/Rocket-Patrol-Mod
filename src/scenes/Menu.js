class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('title', './assets/TitleCard.png');
        
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 
            'starfield').setOrigin(0,0);
        this.add.image(0,0,'title').setOrigin(0,0);
        // Define Keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);    
    }

    update() {
        this.starfield.tilePositionX -= starSpeed - 2;
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            // single mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            // co-op mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene2');    
        }
    }
}