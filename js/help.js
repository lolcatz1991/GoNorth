class Help {
    create() {

        const helpLabel = this.add.text(550, 50, 'instructions', { font: '50px MedievalSharp', fill: '#fff' });
        helpLabel.setOrigin(0.5, 0.5);


        this.cameras.main.setBackgroundColor('rgba(11, 26, 12, 0.5)');


        const centerText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,

            `Use the arrow keys to move the knight

Avoid the Orcs trying to kill you

Continue going north, in order to advance to the next level

Before being able to enter the next level, collect the following: 

- a map
- food
- a key

Press P to pause`,

            { font: '25px MedievalSharp', fill: '#fff', wordWrap: { width: 500 } });


        centerText.setOrigin(0.5);

        this.hKey = this.input.keyboard.addKey('h');

    }

    update() {
        if (this.hKey.isDown) {
            this.scene.sleep('help')
            this.scene.resume('play');
        }
    }
}
