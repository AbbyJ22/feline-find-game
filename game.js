

class StartMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartMenuScene' });
    }

    preload() {
        this.load.image('mainbg', 'assets/mainbg.png');
    }

    create() {
        // Background
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'mainbg').setOrigin(0);

        // Title text
        this.add.text(config.width / 2, config.height / 3, 'Feline Find', {
            fontFamily: 'CustomFont',
            fontSize: '40px',
            fill: '#e08543',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true); 

        // Play button
        const playButton = this.add.text(config.width / 2, config.height / 2, 'Start', {
            fontFamily: 'CustomFont',
            fontSize: '30px',
            fill: '#00FFFF',
        })
        .setOrigin(0.5)
        .setShadow(5, 5, '#000000', 0, true, true); 

        playButton.setInteractive();

        // Play button interactions
        playButton.on('pointerover', () => {
            playButton.setScale(1.2); 
        });

        playButton.on('pointerout', () => {
            playButton.setScale(1); 
        });

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }

    update() {
        this.bg.tilePositionX += 1;  // Moving the background
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('fence', 'assets/fence.png');
        this.load.spritesheet('mcIdle', 'assets/sprites/mcIdle.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('mcwalk', 'assets/sprites/mcwalk.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        // Background
        const bg = this.add.image(0, 0, 'fence').setOrigin(0);
        bg.setDisplaySize(1372, 453);

        // Create animations
        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNumbers('mcIdle', { start: 0, end: 2 }), 
            frameRate: 2, 
            repeat: -1 
        });
        this.anims.create({
            key: 'Walk',
            frames: this.anims.generateFrameNumbers('mcwalk', { start: 0, end: 4 }), 
            frameRate: 4, 
            repeat: -1 
        });

        // Main character sprite
        this.mcIdle = this.add.sprite(328.5, 350, 'mcIdle'); 
        this.mcIdle.setScale(4);
        this.mcIdle.setOrigin(0.5, 0.5);
        this.mcIdle.anims.play('Idle');

        // Display text with a delay
        this.time.delayedCall(1000, () => {
            this.showText("Hello there! You must be new in the neighborhood, right?", [
                { label: "Yes, just moved in!", action: () => console.log("New...") },
                { label: "I'm just passing through.", action: () => console.log("Passing...") }
            ]);
        });
    }

    showText(text, options) {
    const borderColor = 0x3E2A47; // Dark brown for border
    const borderThickness = 3;    // Thickness of the border
    const fillColor = 0xE5AA70;   // Light brown for background
    const textboxWidth = 400;
    const textboxHeight = 100;

    // Create the textbox background with border
    const textbox = this.add.graphics();
    textbox.lineStyle(borderThickness, borderColor, 1); // Border settings
    textbox.strokeRect(20, 20, textboxWidth, textboxHeight); // Border dimensions
    textbox.fillStyle(fillColor, 1); // Fill settings
    textbox.fillRect(
        20 + borderThickness, 
        20 + borderThickness, 
        textboxWidth - borderThickness * 2, 
        textboxHeight - borderThickness * 2
    ); // Adjusted fill dimensions

    // Add text to the textbox
    const textStyle = {
        fontFamily: 'TextFont',
        fontSize: '18px',
        color: '#FFFFFF', // White text
        wordWrap: { width: textboxWidth - 40, useAdvancedWrap: true }, // Adjust word wrap to fit inside the box
    };
    this.add.text(30, 30, text, textStyle); // Text position inside the box

    // Add option buttons
    options.forEach((option, index) => {
        const optionBoxWidth = 400;
        const optionBoxHeight = 30;
        const optionX = 20;
        const optionY = 140 + index * (optionBoxHeight + 10);

        // Create option box with border
        const optionBox = this.add.graphics();
        optionBox.lineStyle(borderThickness, borderColor, 1);
        optionBox.strokeRect(optionX, optionY, optionBoxWidth, optionBoxHeight);
        optionBox.fillStyle(fillColor, 1);
        optionBox.fillRect(
            optionX + borderThickness, 
            optionY + borderThickness, 
            optionBoxWidth - borderThickness * 2, 
            optionBoxHeight - borderThickness * 2
        );

        // Add option text
        const optionText = this.add.text(optionX + 10, optionY + 5, option.label, {
            fontFamily: 'TextFont',
            fontSize: '16px',
            color: '#FFFFFF', // White text
        }).setInteractive();

        // Hover interactions
        optionText.on('pointerover', () => {
            optionText.setStyle({ color: '#D3D3D3' }); // Change text color on hover
        });

        optionText.on('pointerout', () => {
            optionText.setStyle({ color: '#FFFFFF' }); // Reset text color on hover out
        });

        // Click interaction
        optionText.on('pointerdown', () => {
            option.action();
        });
    });
}


const config = {
    type: Phaser.AUTO,
    width: 657,
    height: 453,
    parent: 'game-container',
    scene: [StartMenuScene, GameScene],  // Array of scene classes
    pixelArt: true,
};

// Initialize the Phaser game after everything is defined
window.onload = () => {
    const game = new Phaser.Game(config);
};

