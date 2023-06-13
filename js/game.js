let game = new Phaser.Game({
  width: 1100,
  height: 600,
  backgroundColor: '#2B8235',
  physics: { default: 'arcade' },
  parent: 'game',
});
//, arcade: { debug: true }


game.scene.add('load', Load);
game.scene.add('menu', Menu);
game.scene.add('narrative', Narrative);
game.scene.add('play', Play);
game.scene.add('pause', Pause);
game.scene.add('help', Help);
game.scene.add('ui', UI);
game.scene.add('endscene', Endscene);

game.scene.start('load');
