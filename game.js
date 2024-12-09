// Start Menu Scene
class StartMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartMenuScene' });
    }

    preload() {
         this.load.image('mainbg', 'assets/mainbg.png');
    }

    create() {

           this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'mainbg').setOrigin(0);

        // Add a title
        this.add.text(config.width / 2, config.height / 3, 'Feline Find Game', {
            fontFamily: 'CustomFont',
            fontSize: '40px',
            fill: '#e08543',
        }).setOrigin(0.5);
        .setShadow(5, 5, '#000000', 0, true, true); // Add shadow to the title

        // Add a "Play" button
        const playButton = this.add.text(config.width / 2, config.height / 2, 'Start', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#e08543',
        }).setOrigin(0.5);
        .setShadow(5, 5, '#000000', 0, true, true); // Add shadow to the title

        playButton.setInteractive();
        playButton.on('pointerover', () => {
    playButton.setScale(1.2); // Increase the size by 20%
    .setShadow(5, 5, '#000000', 0, true, true); // Add shadow to the title
});

// On hover out: reset the button size
playButton.on('pointerout', () => {
    playButton.setScale(1); // Reset to the original size
    .setShadow(5, 5, '#000000', 0, true, true); // Add shadow to the title
});
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
    update() {
        // Scroll the background horizontally
        this.bg.tilePositionX += 1; // Adjust the speed as needed
    }
}

// Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('fence', 'assets/fence.png');
    }

    create() {
        const bg = this.add.image(0, 0, 'fence').setOrigin(0);
        bg.setDisplaySize(1372, 453);
    }
}

// Config
const config = {
    type: Phaser.AUTO,
    width: 657,
    height: 453,
    parent: 'game-container',
    scene: [StartMenuScene, GameScene],
    pixelArt: true,
};

// Create the game
const game = new Phaser.Game(config);
