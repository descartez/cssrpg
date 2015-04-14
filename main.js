$(document).ready(function() {

// ----VIEW----------------------------------------------

function GameView(){}

GameView.prototype.changeBackground = function(color) {
  $('body').css('background-color', color);
}

GameView.prototype.changeBackgroundViaId = function(id) {
  $('body').attr('id', id);
}

GameView.prototype.fadeTitleOut = function() {
  $('#title').fadeOut('slow');
}

GameView.prototype.fadeTitleIn = function() {
  $('#title').fadeIn('fast');
}

GameView.prototype.fadeDeathIn = function() {
  $('#dead').fadeIn();
  this.changeBackground('#20173E');
}

GameView.prototype.fadeDeathOut = function() {
  $('#dead').fadeOut();
}

GameView.prototype.addHealth = function() {
  $('#health-bar li').append("<li class='health-points'></li>")
}

GameView.prototype.decreaseHealthBar = function() {
  console.log('You lost health!')
  $('#health-bar').effect("pulsate", {times:2}, 200);
  $('#health-bar li:last').remove();
}

GameView.prototype.damageEnemy = function(health) {
  var colors = ['#731616', '#3C0303', 'black'];
  if (health >= 5) {
    $('#enemy-sprite').effect("pulsate", {times:2}, 200);
  }else if (health >= 3) {
    $('#enemy-sprite').effect("pulsate", {times:2}, 200);
    $('#enemy-sprite').css('background', colors[0]);
  }else if (health >= 1) {
    $('#enemy-sprite').effect("pulsate", {times:2}, 200);
    $('#enemy-sprite').css('background', colors[1]);
  }else if (health >= 0){
    $('#enemy-sprite').effect("explode", {times:2}, 200);
    $('#enemy-sprite').css('background', colors[2]);
  }

  GameView.prototype.showEnemy = function() {
    $('#enemy-sprite').fadeIn('fast');
  }

  GameView.prototype.showVictory = function() {
    $('#victory').fadeIn();
    this.changeBackground('#FF9F9F');
  }
}

// ----MODELS--------------------------------------------

// >>>SPACE

function GameSpace(){};

GameSpace.prototype.setColor = function() {
  idArray = ['path-one','path-two','path-three']
  this.color = idArray[Math.floor(Math.random() * 3)]
}

// >>>PLAYER
function Player(){};

Player.prototype.health = 6;

Player.prototype.checkIfAlive = function(health) {
  if (health <= 0) {
    console.log('player is dead');
    return false;
  }else{
    console.log('player is still alive');
    return true;
  }
};

Player.prototype.takeDamage = function(damage) {
  this.health -= damage;
};

// >>>ENEMY

function Enemy(){};

Enemy.prototype.health = 5;

Enemy.prototype.attackPlayer = function(target) {
  target.health -= 1;
}

Enemy.prototype.takeDamage = function() {
  if (this.health > 0) {
    this.health -= Math.floor((Math.random() * 2) + 1);
  }else if (this.health <= 0) {
    this.health = 0
  }
}

Enemy.prototype.checkIfAlive = function(health) {
  if (health <= 0) {
    console.log('enemy is dead');
    return false;
  }else{
    console.log('enemy is still alive');
    return true;
  }
};
// ----CONTROLLER----------------------------------------

function GameController(){}

GameController.prototype.init = function(){
  console.log("Game has been init'ed")
  this.board = [new GameSpace, new GameSpace, new Enemy];
  console.log(this.board);

  this.player = new Player;
  console.log(this.player);

  this.view = new GameView;
  console.log(this.view);

  this.gameStart = false;
}

GameController.prototype.playerTakesDamage = function() {
  this.view.decreaseHealthBar();
  this.player.takeDamage(1);
}

GameController.prototype.enemyTakesDamage = function(target) {
  console.log(target)
  target.takeDamage();
  this.view.damageEnemy(target.health);
}

GameController.prototype.traverseBoard = function() {
  this.currentSpace = this.board.shift()
}

GameController.prototype.checkCurrentSpace = function() {
  console.log('is it an enemy?')
  if (this.currentSpace instanceof Enemy) {
    console.log('yes it is an enemy')
    // this.view.showEnemy();
    this.runCombat();
  } else {
    console.log('no it is not an enemy')
    this.traverseBoard();
    this.view.changeBackgroundViaId(this.currentSpace.setColor());
  }
}

GameController.prototype.runCombat = function(enemy) {
  while (this.currentSpace.checkIfAlive(this.currentSpace.health) === true) {
    setInterval(this.playerTakesDamage(), 3000)
    $(document).on("keyup", function() {
      this.enemyTakesDamage(this.currentSpace);
    })
  }
}

// GAME CYCLE PSEUDOCODE
// 1. grabs current space
//    a. if normal space, next keyup traverseBoard()
//    b. if enemy, run battle cycle
// 2. battle cycle
//    a. make enemy visible
//    b. start countdown
//      i. every x secs, playerTakesDamage(), checkIfAlive()
//      ii. every keyup, enemyTakesDamage(), checkIfAlive()
//    c. if player dies || enemy dies
//      i. if player dies, showGameOver()
//      ii. if enemy dies, showVictory(), traverseBoard()
// 3. checkIfEnd()
//    a. if end, showWinState()

// ----INITIALIZING----------------------------------------
game = new GameController;
space = new GameSpace;
enemy = new Enemy;
game.init();

$(document).on("keyup", function() {
  if (game.gameStart === false){
    game.view.fadeTitleOut();
    game.view.changeBackgroundViaId('path-one');
    game.gameStart = true
    console.log('game has started')
  }else{
    if (game.player.checkIfAlive(game.player.health) === true){
      game.traverseBoard();
      game.checkCurrentSpace();
      // game.view.changeBackgroundViaId('path-three')
      // game.playerTakesDamage();
      // game.enemyTakesDamage(enemy);
      // game.view.damageEnemy();
      // console.log(game.player.health);
    }else if (game.player.checkIfAlive(game.player.health) === false){
      console.log('ye died');
      game.view.fadeDeathIn();
    }
  }
  // $('#reset').on('click', function(e) {
  //     e.preventDefault();
  //     console.log('reseting...');
  //     game.resetGame();
  // })
});
})
