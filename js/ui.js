class UI extends Phaser.Scene {
    constructor() {
        super('ui');
    }

    create() {
        this.collectables = 0;

        this.collectablesMap = this.physics.add.sprite(30, 30, 'map').setTintFill('#000000').setScale(0.03);
        this.collectablesMapText = this.add.text(30, 60, 'Map', { font: "MedievalSharp", fontSize: '12px', fill: '#FFFFFF' }).setOrigin(0.5);

        this.collectablesFood = this.physics.add.sprite(80, 30, 'sandwich').setTintFill('#000000').setScale(0.015);
        this.collectablesFoodText = this.add.text(80, 60, 'Sandwich', { font: "MedievalSharp", fontSize: '12px', fill: '#FFFFFF' }).setOrigin(0.5);

        this.collectablesKey = this.physics.add.sprite(130, 30, 'key').setTintFill('#000000').setScale(0.015);
        this.collectablesKeyText = this.add.text(130, 60, 'Key', { font: "MedievalSharp", fontSize: '12px', fill: '#FFFFFF' }).setOrigin(0.5);





        // Reference to the Play scene
        this.playScene = this.scene.get('play');

        //  Listen for events from it
        this.playScene.events.on('collected', function (arg) {
            if (arg == this.playScene.collectableMap) {
                this.collectablesMap.clearTint();
                this.collectables += 1
            } else if (arg == this.playScene.collectableKey) {
                this.collectablesKey.clearTint();
                this.collectables += 1
            } else if (arg == this.playScene.collectableSandwich) {
                this.collectablesFood.clearTint();
                this.collectables += 1
            }

        }, this);


        // text for when hero dies
        this.gameOver = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            `GAME OVER`,
            { font: "40px MedievalSharp", fill: "#fff" }
        );
        this.gameOver.alpha = 0;
        this.gameOver.setOrigin(0.5);

    }

    update() {

        // creates the game over text
        if (this.playScene.playerAlive == false) {
            this.tweens.add({
                targets: this.gameOver,
                alpha: 1,
                ease: 'Linear',
                duration: 3000
            });
        };


        if (this.collectables > 2 && this.playScene.player.y < 50) {
            if (this.playScene.level == 1) {
                this.events.emit('changeToLevel2');
                this.playScene.cam2.setAlpha(0);
                this.collectables = 0;
                this.collectablesMap = this.physics.add.sprite(30, 30, 'map').setTintFill('#000000').setScale(0.03);
                this.collectablesFood = this.physics.add.sprite(80, 30, 'sandwich').setTintFill('#000000').setScale(0.015);
                this.collectablesKey = this.physics.add.sprite(130, 30, 'key').setTintFill('#000000').setScale(0.015);

            } else if (this.playScene.level == 2) {
                this.events.emit('changeToLevel3');
                this.playScene.cam2.setAlpha(0);
                this.collectables = 0;
                this.collectablesMap = this.physics.add.sprite(30, 30, 'map').setTintFill('#000000').setScale(0.03);
                this.collectablesFood = this.physics.add.sprite(80, 30, 'sandwich').setTintFill('#000000').setScale(0.015);
                this.collectablesKey = this.physics.add.sprite(130, 30, 'key').setTintFill('#000000').setScale(0.015);
            } else {
                this.scene.stop('play');
                this.scene.stop('ui');
                this.scene.start('endscene');
            }
        };

    }

}