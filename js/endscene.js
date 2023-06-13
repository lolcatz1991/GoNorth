class Endscene {
  create() {
    this.cameras.main.setBackgroundColor("#000000");


    const endCredits = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      `The brave knight reached the northen kingdom, seeking aid. In a swift strike, the orcs were defeated. 
            
            You alone, have made victory possible. 


            Thank you for enjoying our awesome game! 

            Credits: 
            Lasse Lotzkat Thorsen
            Lasse Jensen
            Christian M. Madsen
            `,
      { font: "20px MedievalSharp", fill: "#fff", wordWrap: { width: 1000 } }
    );


    endCredits.setOrigin(0.5);
    endCredits.alpha = -2;

    this.tweens.add({
      targets: endCredits,
      alpha: 1,
      ease: "Linear",
      duration: 4000,
    });

    const theEnd = this.add.text(550, 80, "THE END", {
      font: "60px MedievalSharp",
      fill: "#fff",
    });
    theEnd.setOrigin(0.5);

    this.tweens.add({
      targets: theEnd,
      alpha: 1,
      ease: "Linear",
      duration: 2000,
    });


    this.time.addEvent({
      delay: 15000,
      callback: function () {
        this.scene.stop('endscene');
        this.scene.start('menu');
      },
      callbackScope: this,
      loop: false,
    });

  }




}
