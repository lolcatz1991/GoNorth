class Play {
  create() {

    // creates the player
    this.player = this.physics.add.sprite(751, 4049, 'knight');
    this.player.setSize(15, 25);
    this.player.setCollideWorldBounds(true);
    this.playerAlive = true;

    // adds sounds
    this.forrestBg = this.sound.add('forrestBg');
    this.collectableSound = this.sound.add('collectableSound');
    this.deadSound = this.sound.add('dead');
    this.desertBg = this.sound.add('desertBg');


    // creates input control
    this.arrow = this.input.keyboard.createCursorKeys();

    // creates the map
    this.createLevel(1);


    // starts UI scene with collectables
    this.scene.launch('ui');


    // reference to the UI scene
    this.uiScene = this.scene.get('ui');
    this.uiScene.events.on('changeToLevel2', function () { this.createLevel(2); }, this)
    this.uiScene.events.on('changeToLevel3', function () { this.createLevel(3); }, this)

    // sets the camera on the player 
    this.physics.world.setBounds(0, 0, 2048, 4096);
    this.cameras.main.setBounds(0, 0, 2048, 4096);
    this.cameras.main.setViewport(0, 0, 1100, 600);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);


    // move enemies
    this.timedEvent = this.time.addEvent({
      delay: 3000,
      callback: this.moveEnemies,
      callbackScope: this,
      loop: true
    });


    // maps the p key to be able to pause the game
    this.pKey = this.input.keyboard.addKey('p');

    // maps the h key to be able to get to help
    this.hKey = this.input.keyboard.addKey('h');

    const introText = this.add.text(860, 3860, `Collect the following:
    - Map
    - Key
    - Food
    And then go North!
    Press H for help!`, { font: "25px MedievalSharp", fill: "#fff" });
    introText.alpha = 0;
    introText.setOrigin(0.5);

    this.tweens.add({
      targets: introText,
      alpha: 1,
      ease: "Linear",
      duration: 4000,
      yoyo: true,
    });

  }

  update() {

    if (!this.player.active) {
      return;
    }

    // makes it possible to pause the game
    if (this.pKey.isDown) {
      this.scene.pause('play');
      this.scene.run('pause');
    }

    // makes it possible to access the help menu
    if (this.hKey.isDown) {
      this.scene.pause('play');
      this.scene.run('help');
    }


    this.movePlayer();


    //adds a collider with the objects in the world
    this.physics.collide(this.player, this.topLayer);
    this.physics.collide(this.player, this.midLayer);

    // adds a collider on the ememies
    this.enemies.getChildren().forEach((enemy) => {
      if (enemy.body.velocity.x < 50) {
        enemy.setFlipX(true);
      } else {
        enemy.setFlipX(false);
      };
      this.physics.collide(enemy, this.topLayer);
      this.physics.collide(enemy, this.midLayer);
      enemy.setBounce(-1);

      //checks for overlap between enemy and player and player dies
      if (this.physics.overlap(this.player, enemy)) {
        this.playerDead();
      }
    });


    // below loops through this.enemies array and assign whether or not to follow
    this.enemies.getChildren().forEach((enemy) => {
      if (Phaser.Math.Distance.BetweenPoints(this.player, enemy) < 100) {
        // Calculate the direction from the player to the target
        let dx = this.player.x - enemy.x;
        let dy = this.player.y - enemy.y;
        let angle = Math.atan2(dy, dx);
        // Calculate the velocity vector based on the angle
        let speed = 50;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;
        // Set the velocity of the player sprite
        enemy.setVelocity(vx, vy);
        // sets the direction on the enemy x axis
        if (enemy.x < this.player.x) {
          enemy.setFlipX(false);
        } else {
          enemy.setFlipX(true);
        }
      }
      else {
        enemy.followingPlayer = false;
      }
    });



    // below checks to see if the player collects the collectables
    if (this.physics.overlap(this.player, this.collectableMap)) {
      this.collectableMap.destroy();
      this.cam2 = this.cameras.add();
      this.cam2.setBounds(0, 0, 2048, 4096);
      this.cam2.setViewport(844, 0, 256, 512);
      this.cam2.setZoom(0.1);
      this.cam2.setAlpha(1);
      this.events.emit('collected', this.collectableMap);
    };
    if (this.physics.overlap(this.player, this.collectableKey)) {
      this.collectableKey.destroy();
      this.events.emit('collected', this.collectableKey);
    };
    if (this.physics.overlap(this.player, this.collectableSandwich)) {
      this.collectableSandwich.destroy();
      this.events.emit('collected', this.collectableSandwich);
    };


  };


  // creates a map based on the level parameter 1,2 or 3
  createLevel(level) {
    if (this.map != undefined) {
      this.map.destroy();
    }

    if (level == 1) {
      this.cameras.main.setBackgroundColor('#2B8235');
      this.map = this.make.tilemap({ key: 'map1' });
      this.collectableMap = this.physics.add.sprite(1519, 3330, 'map');
      this.collectableMap.setScale(0.025);
      this.collectableKey = this.physics.add.sprite(273, 1200, 'key');
      this.collectableKey.setScale(0.01);
      this.collectableSandwich = this.physics.add.sprite(1583, 1887, 'sandwich');
      this.collectableSandwich.setScale(0.015);
      this.forrestBg.play('', 0, 1, true);
      this.forrestBg.setVolume(0.2);
      this.level = 1;
    }
    else if (level == 2) {
      this.player.setX(850);
      this.player.setY(4044);
      this.cameras.main.setBackgroundColor('#ff00ff');
      this.map = this.make.tilemap({ key: 'map2' });
      this.collectableMap = this.physics.add.sprite(1773, 801, 'map');
      this.collectableMap.setScale(0.025);
      this.collectableKey = this.physics.add.sprite(1510, 2280, 'key');
      this.collectableKey.setScale(0.01);
      this.collectableSandwich = this.physics.add.sprite(210, 580, 'sandwich');
      this.collectableSandwich.setScale(0.015);
      this.forrestBg.stop();
      this.desertBg.play('', 0, 1, true);
      this.desertBg.setVolume(0.2);
      this.level = 2;
    }
    else if (level == 3) {
      this.player.setX(914);
      this.player.setY(4064);
      this.cameras.main.setBackgroundColor('#5865F2');
      this.map = this.make.tilemap({ key: 'map3' });
      this.collectableMap = this.physics.add.sprite(1008, 3071, 'map');
      this.collectableMap.setScale(0.025);
      this.collectableKey = this.physics.add.sprite(599, 1755, 'key');
      this.collectableKey.setScale(0.01);
      this.collectableSandwich = this.physics.add.sprite(144, 709, 'sandwich');
      this.collectableSandwich.setScale(0.015);
      this.desertBg.play('', 0, 1, true);
      this.desertBg.setVolume(0.2);
      this.level = 3;
    };

    const terrain = this.map.addTilesetImage("terrain_atlas", "terrain");
    const itemset = this.map.addTilesetImage("items");
    this.botLayer = this.map.createLayer("bot", [terrain], 0, 0).setDepth(-2);
    this.midLayer = this.map.createLayer("mid", [terrain, itemset], 0, 0).setDepth(-1);
    this.topLayer = this.map.createLayer("top", [terrain, itemset], 0, 0);
    this.items = this.map.getObjectLayer('items').objects;

    //Collects the enemy positions from the object layer
    this.enemyPositions = this.map.getObjectLayer('enemies').objects;

    this.enemies = this.physics.add.group();
    // looping through object layer positions and adding enemies to the group 
    for (let i = 0; i < this.enemyPositions.length; i++) {
      let enemy = this.enemies.create(this.enemyPositions[i].x, this.enemyPositions[i].y, 'zombie');
      enemy.body.setCollideWorldBounds(true);
      enemy.body.setBounce(1, 1);
      enemy.followingPlayer = false;
      enemy.anims.play('moveZombie', true);
      enemy.setDepth(-1);
      enemy.setSize(25, 35);
      enemy.setOffset(20, 30);
    };


    // sets collision based on property given to the tile i Tiled software
    this.topLayer.setCollisionByProperty({ collide: true });
    this.topLayer.setCollisionByProperty({ collides: true });
    this.midLayer.setCollisionByProperty({ collide: true });
    this.midLayer.setCollisionByProperty({ collides: true });

  };


  playerDead() {
    if (!this.playerAlive) {
      return;
    };
    this.playerAlive = false;
    this.forrestBg.stop();
    this.deadSound.play();
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    this.uiScene.collectables = 0;
    this.player.anims.play('dead', true);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.player.alpha = 0;
        this.tweens.add({
          targets: this.player,
          alpha: 1,
          duration: 20,
          repeat: 19
        });
        this.tweens.add({
          targets: this.player,
          scaleX: 0,
          scaleY: 0,
          duration: 1000,
          ease: 'Power2',
          completeDelay: 500,
          onComplete: () => {
            this.scene.stop('play');
            this.scene.stop('ui');
            this.scene.start('menu');
          }
        });
      }
    });
  };




  // moves the enemies around unless they are following the player
  moveEnemies() {
    this.enemies.getChildren().forEach((enemy) => {

      if (!enemy.followingPlayer) {
        const randNumber = Math.floor((Math.random() * 4) + 1);
        switch (randNumber) {
          case 1:
            enemy.body.setVelocityX(50);
            enemy.setFlipX(false);
            break;
          case 2:
            enemy.body.setVelocityX(-50);
            enemy.setFlipX(true);
            break;
          case 3:
            enemy.body.setVelocityY(50);
            break;
          case 4:
            enemy.body.setVelocityY(-50);
            break;
          default:
            enemy.body.setVelocityX(50);
        }
      }
    })
  };


  movePlayer() {
    if (this.playerAlive == true) {
      let velocityX = 0;
      let velocityY = 0;

      if (this.arrow.left.isDown) {
        velocityX = -1;
      } else if (this.arrow.right.isDown) {
        velocityX = 1;
      }

      if (this.arrow.up.isDown) {
        velocityY = -1;
      } else if (this.arrow.down.isDown) {
        velocityY = 1;
      }

      const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      if (magnitude > 0) {
        velocityX /= magnitude;
        velocityY /= magnitude;
        velocityX *= 100;
        velocityY *= 100;
        this.player.setVelocityX(velocityX);
        this.player.setVelocityY(velocityY);
        this.player.anims.play('move', true);
        this.player.setOffset(20, 30);

        if (velocityX < 0) {
          this.player.setFlipX(true);
        } else if (velocityX > 0) {
          this.player.setFlipX(false);
        }

      } else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('idle', true);
        this.player.setOrigin(0.5, 1);
        this.player.setOffset(2, 0);
      }
    };
  };

};
