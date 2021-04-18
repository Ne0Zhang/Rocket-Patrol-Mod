class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship1', './assets/spaceship10.png');
        this.load.image('spaceship2', './assets/spaceship20.png');
        this.load.image('spaceship3', './assets/spaceship30.png');
        this.load.image('spaceship4', './assets/spaceship80.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('planet', './assets/starfield1.png');
        this.load.image('UI', './assets/UI.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 96,
            frameHeight: 96,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // place starfield at position (0,0)
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 
            'starfield').setOrigin(0,0);
        this.planet = this.add.tileSprite(0, 0, game.config.width, game.config.height, 
            'planet').setOrigin(0,0);

        // game UI background
        this.add.sprite(0,10, 'UI').setOrigin(0,0);

        // White Borders
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0xffffff).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize*2, borderUISize, borderUISize, 0xffffff).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, game.config.height - borderUISize*2, borderUISize, borderUISize, 
            0xffffff).setOrigin(0,0);

        // add rocket2 and bind it to the scene
        this.p1Rocket = new Rocket(this, game.config.width/4*3, game.config.height - 
            borderUISize - borderPadding * 4, 'rocket').setOrigin(0.5, 0);
        // add rocket2 and bind it to the scene
        this.p2Rocket = new Rocket2(this, game.config.width/4, game.config.height - 
            borderUISize - borderPadding * 4, 'rocket2').setOrigin(0.5, 0);

        // add spaceship (x4)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
             'spaceship1', 0, 30, 1).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + 
            borderPadding*2, 'spaceship2', 0, 20, 1.25).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 
            'spaceship3', 0, 10, 1.5).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width, Phaser.Math.Between(borderUISize*4, borderUISize*6 + borderPadding*4), 
            'spaceship4', 0, 80, 8).setOrigin(0,0);

        // Define our keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // These are keys for Player 1
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // These are keys for Player 2
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // animation config
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 50
        });

        // initialize score
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding, this.p1Score, scoreConfig);


                
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
                'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 
                'Press (R) to Restart or <= for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // Display Timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = this.add.text(borderUISize + borderPadding*43, 
            borderUISize + borderPadding, game.settings.gameTimer/1000 - Math.floor(this.clock.elapsed/1000) - 1, timerConfig);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed - 2;
        this.planet.tilePositionX -= starSpeed;

        if (!this.gameOver) {
            this.timeLeft.text = game.settings.gameTimer/1000 - Math.floor(this.clock.elapsed/1000);
            // update rocket
            this.p1Rocket.update();
            this.p2Rocket.update();
            // update spaceship
            this.ship01.update(borderUISize*4);
            this.ship02.update(borderUISize*5 + borderPadding*2);
            this.ship03.update(borderUISize*6 + borderPadding*4);
            this.ship04.update(Phaser.Math.Between(borderUISize*4, borderUISize*6 + borderPadding*4));
        }

        // Check Collision for First Player
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.clock.elapsed -= 2000;
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, (borderUISize*6 + borderPadding*4));
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.clock.elapsed -= 2000;
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, (borderUISize*5 + borderPadding*2));
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.clock.elapsed -= 2000;
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, (borderUISize*4));
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.clock.elapsed -= 3000;
            this.p1Rocket.reset();
            this.shipExplode(this.ship04, (Phaser.Math.Between(borderUISize*4, borderUISize*6 + borderPadding*4)));
        }

        // Check Collision for Second Player
        if (this.checkCollision(this.p2Rocket, this.ship03)) {
            this.clock.elapsed -= 2000;
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, (borderUISize*6 + borderPadding*4));
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.clock.elapsed -= 2000;
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, (borderUISize*5 + borderPadding*2));
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.clock.elapsed -= 2000;
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, (borderUISize*4));
        }
        if (this.checkCollision(this.p2Rocket, this.ship04)) {
            this.clock.elapsed -= 2000;
            this.p2Rocket.reset();
            this.shipExplode(this.ship04, (Phaser.Math.Between(borderUISize*4, borderUISize*6 + borderPadding*4)));
        }


    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, position) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite ate ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset(position);
            ship.alpha = 1;
            boom.destroy();
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}