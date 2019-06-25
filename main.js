var config ={
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics:{
        default: 'arcade'
    },
    scene:{
        preload:preloadGame,
        create:createGame,
        update:updateGame
    },
    audio:{
        disableWebAudio: true
    }
};

//variables for the game's components
var player;
var player2;
var ball;

//function where images are going to be loaded
function preloadGame(){
    this.load.image('ground', 'assets/img/playground.png');
    this.load.image('player', 'assets/sprites/player.png');
    this.load.image('player2', 'assets/sprites/player2.png');
    this.load.image('ball', 'assets/sprites/blue.png');
    
}

//variables for the movements
var cursors;

var velocityX = Phaser.Math.Between(-150,150);
var velocityY = 150;

//variables for the scoring system
var scoreplayer = 0;
var scoreplayer2 = 0;
var scoreTextplayer;
var scoreTextplayer2;

//function where objects are created
function createGame()
{
    this.add.image(400,200, 'ground')
    //var music = this.sound.add('inst1');
    //music.play();

    cursor = this.input.keyboard.createCursorKeys(); //allowing keyboard access
    console.log(cursor);

    player = this.physics.add.sprite(780,200, 'player').setImmovable(); // setImmovable makes the player immovable
    player.setCollideWorldBounds(true); // Stops the player from going outside the background

    player2 = this.physics.add.sprite(20,200, 'player2').setImmovable();
    player2.setCollideWorldBounds(true);

    //creating keyboard movements for player 2
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    //definitions for the ball
    ball = this.physics.add.sprite(400, 200, 'ball');
    ball.setCollideWorldBounds(true); // ensures that the ball stays within game borders
    ball.setBounce(1);//prevents the change of speed

    ball.setVelocityY(velocityY);
    ball.setVelocityX(velocityX);

    //ensures that the ball collides with the players in the game
    this.physics.add.collider(ball, player, hitPlayer, null, this);
    this.physics.add.collider(ball, player2, hitPlayer2, null, this);

    // displays the scores
    scoreTextplayer2 = this.add.text(16,16, 'score:0', { fontFamily:'Arial', fontSize: '16px', color: '#00000' });
    scoreTextplayer = this.add.text(700,16, 'score:0', { fontFamily:'Arial', fontSize: '16px', color: '#00000'});
   
}

//this function ensures that the ball collides with the player 1
function hitPlayer(ball,player)
{
    velocityX = velocityX+50;
    velocityX= velocityX*-1;
    console.log(velocityX);

    ball.setVelocityX(velocityX);

    if(velocityY<0)
    {
        velocityY=velocityY*-1
        ball.setVelocityY(velocityY);
    }
    //player.setVelocityX(-1);
}

//this function ensures that the ball collides with the player 2
function hitPlayer2(ball,player2)
{
    velocityX = velocityX-50;
    velocityX = velocityX*-1;
    console.log(velocityX);
    ball.setVelocityX(velocityX);

    if(velocityY<0)
    {
        velocityY = velocityY*-1
        ball.setVelocityY(velocityY);
    }
    //player2.setVelocityX(1);
}

//repeated events at certain time intervals
function updateGame()
{
    if(cursor.up.isDown) // move up if the key is pressed
    {
        player.setVelocityY(-200);

    }
    else if(cursor.down.isDown) // move down if the down key is pressed
    {
        player.setVelocityY(200);
    } 
    else // stop if no key is pressed
    {
        player.setVelocityY(0);
    }

    //player 2 key movements
    if(this.keyW.isDown) // move up if the key is pressed
    {
        player2.setVelocityY(-200);

    }
    else if(this.keyS.isDown) // move down if the down key is pressed
    {
        player2.setVelocityY(200);
    } 
    else // stop if no key is pressed
    {
        player2.setVelocityY(0);
    }
    //resets the game and adds a score as soon as the ball touches the wall
    if(ball.x>790)
    {
        scoreplayer2 +=1;
        scoreTextplayer2.setText('score: '+ scoreplayer2);
        reset()
    }

    if(ball.x<10)
    {
        scoreplayer +=1;
        scoreTextplayer.setText('score: '+ scoreplayer);
        reset()
    }

}

// function that makes the game restart if the ball strikes the borders
function reset()
{
    velocityX = Phaser.Math.Between(-150,150);
    velocityY=150;
    ball.x=400;
    ball.y=200;
    player.x=780;
    player.y=200;
    player2.x=20;
    player2.y=200;
    ball.setVelocityX(velocityX);
    ball.setVelocityY(velocityY);
}
var game = new Phaser.Game(config);
