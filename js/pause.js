class Pause {

    create() {

        const pauseLabel = this.add.text(550, 270, 'Paused', { font: '100px MedievalSharp', fill: '#fff' });
        pauseLabel.setOrigin(0.5, 0.5);

        this.pKey = this.input.keyboard.addKey('p');

    }

    update() {
        if (this.pKey.isDown) {
            this.scene.sleep('pause')
            this.scene.resume('play');
        }

    }
};