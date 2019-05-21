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

let emitter;
let paddle;
let ball;
let bricks;
var scoreText;
var score = 0;
var lives = 3;
var gameOver = false;

var game = new Phaser.Game(config);

function preload ()
{
    // Get the ball to bounce of all walls except the floor.
    this.load.atlas('assets', 'assets/GameSprite2.png', 'assets/GameSprite2.json');
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    
}

function create ()
{
    emitter = window.mitt();

    // Get the ball to bounce of all walls except the floor.
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
    this.ball = this.physics.add.image(400, 550, 'assets', 'ball.png').setCollideWorldBounds(true);

    // Get the ball to start on paddle.x.
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 520);
    this.ball.setData('onPaddle', true);

    // Get the collider logic.
    this.physics.add.collider(this.ball, this.bricks, hitBrick, null, this);
    this.physics.add.collider(this.ball, this.paddle);

    //  Get the paddle to follow how the mouse move.
    this.input.on('pointermove', function(pointer){
      this.paddle.x = pointer.x;
      if (this.ball.getData('onPaddle'))
         {
           this.ball.x = this.paddle.x;
         }
    }, this);

    // Get the ball start from paddle.x. The ball start bounce on mouseclick.
    this.input.on('pointerup', function (pointer) {
      // Get the ball to start bouncing when mouse clicked.
      if (this.ball.getData('onPaddle'))
        {
          this.ball.setVelocity(-100, -300);
          this.ball.setBounce(1);
          this.ball.setData('onPaddle', false);
        }
    }, this);

    var add = this.add;
    WebFont.load({
      custom: {
          families: [ 'Amatic SC' ]
      },
      active: function ()
      {
        // Print score
        let scoreText = add.text(5, 5, 'Score: 0', { font: '30px Amatic SC', fill: '#8347C1' })
        emitter.on('updateScore', (score) => {
          scoreText.setText('Score: ' + score);
        });

        //  The score
        let livesText = add.text(710, 5, 'Lives: ' + lives, { font: '30px Amatic SC', fill: '#8347C1' });
        emitter.on('updateLives', (lives) => {
          livesText.setText('lives: ' + lives);
        });

        // Text if you loose the game.
        let gameOverText = add.text(225, 200, ' ', { font: '120px Amatic SC', fill: '#8347C1'});
        emitter.on('printGameOver', () => {
          gameOverText.setText('Game Over');
        });
      }
  });
}

function hitBrick (ball, brick) {
  console.log('hit');
  brick.disableBody(true, true);

  // Update score
  score += 10;
  emitter.emit('updateScore', score);

  // When the ball hits all the bricks, start the bricks layout all over again.
  if (this.bricks.countActive() === 0)
  {
    // Get the ball to start posistion again.
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 520);
    this.ball.setData('onPaddle', true);

    this.bricks.children.each(function (brick) {
      brick.enableBody(false, 0, 0, true, true);
    });
  }
}

function update ()
{
  // When the ball bounce out from the box, restart the ball again.
  if (this.ball.y > 600)
  {
    lives -= 1;
    emitter.emit('updateLives', lives);
    // this.livesText.setText('Lives: ' + lives);
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 520);
    this.ball.setData('onPaddle', true);
  }

  if(lives == 0) {
    this.physics.pause();
    this.ball.setData('onPaddle', true);
    emitter.emit('printGameOver');
    // this.gameOverText.setText('Game Over');
    gameOver = true;
  }
}
