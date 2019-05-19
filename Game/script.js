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
let ball;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.atlas('assets', 'assets/GameSprite.png', 'assets/GameSprite.json');

}

function create ()
{
    // get the ball to bounce of all wllas exapt the floor.
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  A simple background for our game
    this.physics.add.image(400, 300, 'assets', 'unicorn.png');

    // Create bricks.
    this.bricks = this.physics.add.staticGroup({
        key: 'assets', frame: [ 'lavender.png', 'purple.png', 'pink.png', 'yellow.png', 'green.png', 'blue.png' ],
        frameQuantity: 10,
        gridAlign: { width: 10, height: 6, cellWidth: 70, cellHeight: 30, x: 85, y: 100 }
    });

    // Create paddle, setImmovable to prevent the ball to push the paddle out of the box.
    this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle.png').setImmovable().setCollideWorldBounds(true);

    //Create the ball
    this.ball = this.physics.add.image(400, 350, 'assets', 'ball.png').setCollideWorldBounds(true);

    //Get the ball to move around
    this.ball.setBounce(1);
    this.ball.body.gravity.y = 100;
    this.ball.body.velocity.set(150);
    this.ball.setData('onPaddle', true);


    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

    //  Event to get the paddle to follow how the mouse move.
    this.input.on('pointermove', function(pointer){
      this.paddle.x = pointer.x;
    }, this);

    this.input.on('pointerup', function (pointer) {

            if (this.ball.getData('onPaddle'))
            {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }

        }, this);





}

function update ()
{

}
