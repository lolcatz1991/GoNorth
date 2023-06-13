class Menu {
  create() {

    const bg = this.add.image(0, 0, 'bgImageMenu');
    //bg.setScrollFactor(0);
    bg.setDisplaySize(this.game.config.width, this.game.config.height);
    bg.setOrigin(0);


    this.player = this.physics.add.sprite(100, 300, "knight");
    this.player.setScale(3);
    this.player.anims.play("idle", true);

    this.enemies = this.physics.add.sprite(1000, 300, "zombie");
    this.enemies.setScale(3);
    this.enemies.setFlipX(true);
    this.enemies.anims.play("idlezombie", true);

    const nameLabel = this.add.text(550, -50, 'Go North!', { font: '70px MedievalSharp', fill: '#fff' });
    nameLabel.setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: nameLabel,
      y: 300,
      duration: 1000,
      ease: 'bounce.out',
    });

    const startText = 'press SPACE to start';
    const startLabel = this.add.text(550, 400, startText, { font: '25px MedievalSharp', fill: '#fff' });
    startLabel.setOrigin(0.5, 0.5);
    startLabel.angle = -2;
    this.tweens.add({
      targets: startLabel,
      angle: 4,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    const helpText = "Press H in game for instructions";
    const helpLabel = this.add.text(150, 530, helpText, {
      font: "25px MedievalSharp",
      fill: "#fff",
    });
    helpLabel.setOrigin(0.5, 0.5);
    helpLabel.setScale(0.7);


    this.spaceKey = this.input.keyboard.addKey('SPACE');

    this.muteButton = this.add.sprite(30, 560, 'mute');
    this.muteButton.setInteractive({ useHandCursor: true });
    this.muteButton.on('pointerdown', this.toggleSound, this);
    this.muteButton.setFrame(this.sound.mute ? 1 : 0); // fancy if statement from Anne
  }

  update() {
    if (this.spaceKey.isDown) {
      this.scene.start('narrative');
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
