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

let paddle;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.atlas('assets', 'assets/GameSprite.png', 'assets/GameSprite.json')

}

function create ()
{
    //  A simple background for our game
    this.physics.add.image(400, 300, 'assets', 'unicorn.png')

    // Create paddle, setImmovable to prevent the ball to push the paddle out of the box.
    this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle.png').setImmovable().setCollideWorldBounds(true);

    //  Event to get the paddle to follow how the mouse move.
    this.input.on('pointermove', function(pointer){
      this.paddle.x = pointer.x;
    }, this);

}

function update ()
{

}
