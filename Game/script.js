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
    // Add sprite
    this.load.atlas('assets', 'assets/GameSprite.png', 'assets/GameSprite.json');
    // Add font
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    //Add audio
    this.load.audio('blip', 'assets/audio/blip.wav');
    this.load.audio('loose', 'assets/audio/loose.wav');
}

// Get the canvas responsive to work on small and large devices.
function resize() {
  var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
  var scale = width / height, ratio = canvas.width / canvas.height;

  if (scale < ratio) {
    canvas.style.width = width + 'px';
    canvas.style.height = (width / ratio) + 'px';
  } else {
    canvas.style.width = (height * ratio) + 'px';
    canvas.style.height = height + 'px';
  }
}

function create ()
{
  emitter = window.mitt();

  window.addEventListener('resize', resize);
  resize();

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
  this.input.on('pointermove', function (pointer)
  {
    this.paddle.x = pointer.x;
    if (this.ball.getData('onPaddle'))
    {
      this.ball.x = this.paddle.x;
    }
  }, this);

  // Get the ball start from paddle.x. The ball start bounce on mouseclick.
  this.input.on('pointerup', function (pointer)
  {
    // Get the ball to start bouncing when mouse clicked.
    if (this.ball.getData('onPaddle'))
    {
      this.ball.setVelocity(-300, -500);
      this.ball.setBounce(1);
      this.ball.setData('onPaddle', false);
    }
  }, this);

  var add = this.add;

  // Load font
  WebFont.load({
    custom: {
    families: [ 'Amatic SC' ]
    },
    active: function ()
    {
      // Print score
      let scoreText = add.text(10, 5, 'Score: 0', { font: '30px Amatic SC', fill: '#8347C1' })
      emitter.on('updateScore', (score) => {
        scoreText.setText('Score: ' + score);
      });

      //  The score
      let livesText = add.text(730, 5, 'Lives: ' + lives, { font: '30px Amatic SC', fill: '#8347C1' });
      emitter.on('updateLives', (lives) => {
        livesText.setText('lives: ' + lives);
      });

      // Text if you loose the game.
      let gameOverText = add.text(225, 200, ' ', { font: '120px Amatic SC', fill: '#8347C1' });
      emitter.on('printGameOver', () => {
        gameOverText.setText('Game Over');
      });

      let gameOverScore = add.text(230, 340, ' ', { font: '90px Amatic SC', fill: '#8347C1' });
      emitter.on('printScore', (score) => {
        gameOverScore.setText('Your score: ' + score);
      });

      let restartGameText = add.text(300, 10, ' ', { font: '60px Amatic SC', fill: '#8347C1' });
      emitter.on('restartGame', () => {
        restartGameText.setText('Restart Game');
      });
    }
  });

  // The audio sound
  this.sound.add('blip');
  this.sound.add('loose');

}

function hitBrick (ball, brick)
{
  brick.disableBody(true, true);

  //Add sound effect when ball hits the brick.
  this.sound.play('blip');

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

    this.bricks.children.each(function (brick)
    {
      brick.enableBody(false, 0, 0, true, true);
    });
  }
}

function update ()
{
  // When gameover relaod page with mouse click.
  if (gameOver)
  {
    this.input.on('pointerup', function (pointer)
    {
      window.location.reload();
    })
  }

  // When the ball bounce out from the box, restart the ball again.
  if (this.ball.y > 600)
  {
    lives -= 1;
    emitter.emit('updateLives', lives);
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 512);
    this.ball.setData('onPaddle', true);
    this.sound.play('loose');

  }

  if(lives == 0)
  {
    this.physics.pause();
    this.ball.setData('onPaddle', true);
    emitter.emit('printGameOver');
    emitter.emit('printScore', score);
    emitter.emit('restartGame');
    gameOver = true;
  }
}
