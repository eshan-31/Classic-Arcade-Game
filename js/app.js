document.body.onLoad = initialize();
var imag;
var count; //for number of moves
var life; //for number of lives
var mov=document.getElementById("moves");
var liv=document.getElementById("lives");
function initialize() //for modal
{  mod1=document.getElementById("initialModal");
}
function closeModal() {
    count=0;
    life=4;
    mov.innerHTML=count;
    liv.innerHTML=life;
    mod1.classList.add("fade");
    if(document.getElementById("p1").checked)imag="char-boy.png";
    else if(document.getElementById("p2").checked)imag="images/char-cat-girl.png";
    else if(document.getElementById("p3").checked)imag="images/char-horn-girl.png";
    else if(document.getElementById("p4").checked)imag="images/char-pink-girl.png";
    else if(document.getElementById("p5").checked)imag="images/char-princess-girl.png";
    else return 0;
    player.change(imag);
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
    if(this.x>505){ //when the emnemy is out of canvas
    this.x = -40;
    var r = Math.floor(Math.random() * 400) //random speed increase
    this.speed = 180 + r;
}
if (player.x < this.x + 65 && player.x + 30 > this.x - 30 && player.y < this.y + 40 && 50 + player.y > this.y) { //for collision
    player.startpos();
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
  if(this.y < -10){
      this.win();
  }
};

Player.prototype.change = function(imag) {
  this.sprite=imag;
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

Player.prototype.handleInput = function(key) { //for moving the player accross screen ( blockto block)
  if(key == 'left'){
    this.x = this.x - 90;
    count+= 1;
} else if(key == 'right') {
    this.x = this.x + 90;
    count+= 1;
} else if(key == 'up') {
    this.y = this.y - 90;
    count+= 1;
} else if(key == 'down'){
    this.y = this.y + 90;
    count+= 1;
}
mov.innerHTML = count;
};

//when a player wins
Player.prototype.win = function() {
  life+=1;
  liv.innerHTML=life;
  this.x=200;
  this.y=400;
  alert("CONGRATULATIONS !! \n Well Done, you got an extra life \n Try to get as many lives as you can \n 10+ Lives - You're an amateur \n 20+ Lives - you're a challenging player \n 35+ Lives - you're a legend \n You have "+life+" Lives in "+count+" moves");
};

//after collision
Player.prototype.startpos = function() {
  life-=1;
  if(life==0){alert("0 LIVES - GAME OVER !!!!!!!! \n You played "+count+" Moves \n Try Again");
              life = 4;
              this.x=200;
              this.y=400;
              liv.innerHTML=life;
              count=0;
              mov.innerHTML=count;
              }
  else {
  liv.innerHTML=life;
this.x=200;
this.y=400;}

};

// Now instantiate your objects.
var allEnemies=[]
let espeed=[];
for(let i=0; i<4; i++){
  espeed[i]=Math.floor(Math.random()*200);
}
bug1 = new Enemy(espeed[0],0,60);
bug2 = new Enemy(espeed[1],0,145);
bug3 = new Enemy(espeed[2],0,230);
bug4 = new Enemy(espeed[3],0,60);
allEnemies=[bug1,bug2,bug3,bug4];

var player = new Player(200, 400);
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
