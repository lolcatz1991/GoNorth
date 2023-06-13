class Narrative {
    create() {
        this.cameras.main.setBackgroundColor('#000000');


        const centerText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,
            `Once upon a time, there was a brave knight who lived in a kingdom that was under attack by orcs. 

             As the fighting continued the else beautiful kingdom lost most of its forces, weapons and ressources.  
             
             As a last resort, The last knight was tasked with a mission of the upmost importance - to get aid from the northern kingdoms.
            
             Without a second of a doubt, the brave knight accepted the dangerous task, knowing that he had to gather ressources on his way, in order to reach the gates of the far northern kingdom. 

            With dedication in his eyes, the knight set out on his quest to: 
            `
            , { font: '20px MedievalSharp', fill: '#fff', wordWrap: { width: 1000 } });


        centerText.setOrigin(0.5);
        centerText.alpha = 0;

        this.tweens.add({
            targets: centerText,
            alpha: 1,
            ease: 'Linear',
            duration: 2000
        });


        const goNorth = this.add.text(375, 475, 'GO NORTH!', { font: '60px MedievalSharp', fill: '#fff', })
        goNorth.alpha = 0;


        this.tweens.add({
            targets: goNorth,
            alpha: 1,
            ease: 'Linear',
            duration: 10000
        });

        this.spaceKey = this.input.keyboard.addKey('SPACE');

        this.muteButton = this.add.sprite(30, 560, 'mute');
        this.muteButton.setInteractive({ useHandCursor: true });
        this.muteButton.on('pointerdown', this.toggleSound, this);
        this.muteButton.setFrame(this.sound.mute ? 1 : 0);
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('play');
        }
    }

    toggleSound() {
        if (this.sound.mute) {
            this.sound.mute = false;
            this.muteButton.setFrame(0);
        } else {
            this.sound.mute = true;
            this.muteButton.setFrame(1);
        }
    }
}
