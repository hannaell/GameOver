var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{   
    this.load.atlas('assets', 'assets/GameSprite.png', 'assets/GameSprite.json')
    
}

function create ()
{
    //  A simple background for our game
    this.physics.add.image(400, 300, 'assets', 'unicorn.png')
}

function update ()
{

}
