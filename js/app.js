document.body.onLoad = initialize();
var imag;
function initialize()
{ var mov=document.getElementById("moves");
  var liv=document.getElementById("lives");
  var count=0;
  var life=4;
  mov.innerHTML=count;
  liv.innerHTML=life;
  mod1=document.getElementById("initialModal");
}
function closeModal() {
    mod1.classList.add("fade");
    if(document.getElementById("p1").checked)imag="char-boy.png";
    else if(document.getElementById("p2").checked)imag="char-cat-girl.png";
    else if(document.getElementById("p3").checked)imag="char-horn-girl.png";
    else if(document.getElementById("p4").checked)imag="char-pink-girl.png";
    else if(document.getElementById("p5").checked)imag="char-princess-girl.png";
    else return 0;
  /*  player.changePlayer("char-horn-girl.png");
    player.render();*/
}
// Enemies our player must avoid
var Enemy = function(speed,x,y) {
    this.x=x;
    this.y=y;
    this.speed=speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    if(this.x>505){
    this.x = -20;
    var r = Math.floor(Math.random() * 600)
    this.speed = 200 + r;
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.x=x;
  this.y=y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  if(this.x<0){
      this.x=0;
  }
  if(this.x>=420)
  {
      this.x = 420;
  }
  if(this.y > 400){
      this.y = 400;
  }
  /*Player reaches water*/
  if(this.y < -10){
      this.win();
  }
};

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

Player.prototype.handleInput = function(key) {

};
// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
