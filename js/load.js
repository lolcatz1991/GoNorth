class Load {
  preload() {
    this.load.spritesheet('knight', 'assets/Heroes/Knight/Run/Run-Sheet.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('zombie', 'assets/Enemy/Run-Sheet.png', {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("idlezombie", "assets/Enemy/Idle-Sheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('idleknight', 'assets/Heroes/Knight/Idle/Idle-Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('deadknight', 'assets/Heroes/Knight/Death/Death-Sheet.png', {
      frameWidth: 50,
      frameHeight: 32,
    });


    this.load.spritesheet('mute', 'assets/muteButton.png', {
      frameWidth: 28,
      frameHeight: 22,
    });

    this.load.image("key", "./assets/key.png");
    this.load.image("map", "./assets/map.png");
    this.load.image("sandwich", "./assets/sandwich.png");

    this.loadLabel = this.add.text(550, 300, 'loading\n0%', { font: '30px MedievalSharp', fill: '#fff', align: 'center' });
    this.loadLabel.setOrigin(0.5, 0.5);
    this.load.on('progress', this.progress, this);


    this.load.image("terrain", "./assets/terrain_atlas.png");
    this.load.image("items", "./assets/items.png");

    this.load.image("bgImageMenu", "./assets/bgImageMenu.png");

    this.load.tilemapTiledJSON("map1", "./assets/map1.json");
    this.load.tilemapTiledJSON("map2", "./assets/map2.json");
    this.load.tilemapTiledJSON("map3", "./assets/map3.json");

    this.load.audio('dead', 'assets/scream.mp3');
    this.load.audio('forrestBg', ['assets/forrestBg.ogg']);
    this.load.audio('desertBg', ['assets/desertBg.mp3']);
    this.load.audio('collectableSound', ['assets/coin.ogg', 'assets/coin.mp3']); // glemt at bruge
  }

  progress(value) {
    const percentage = Math.round(value * 100) + '%';
    this.loadLabel.setText('loading\n' + percentage);
  }

  create() {

    this.anims.create({
      key: 'move',
      frames: 'knight',
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: 'idleknight',
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'dead',
      frames: this.anims.generateFrameNumbers('deadknight', { start: 0, end: 4 }),
      frameRate: 5,
    });
    this.anims.create({
      key: 'moveZombie',
      frames: 'zombie',
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "idlezombie",
      frames: "idlezombie",
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start('menu');
  }
}
