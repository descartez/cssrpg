
$(document).ready(function() {

// ----VIEW----------------------------------------------

function GameView(){}

GameView.prototype.changeBackground = function(color) {
  $('body').css('background-color', color);
}

GameView.prototype.fadeTitleOut = function() {
  $('#title').fadeOut('slow');
}

GameView.prototype.fadeTitleIn = function() {
  $('#title').fadeIn('fast');
}

GameView.prototype.fadeDeathIn = function() {
  $('#dead').fadeIn();
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
    $('#health-bar li:last').remove()
  }

// GameView.prototype.resetGameView = function() {
//   this.fadeTitleIn();
//   this.fadeDeathOut();
//   this.addHealth();
//   this.addHealth();
//   this.addHealth();
//   this.addHealth();
//   this.addHealth();
//   this.addHealth();

// }
// ----MODELS--------------------------------------------


// >>>GAMEBOARD
function GameBoard(){};

GameBoard.prototype.spaces = [];

GameBoard.prototype.traverseBoard = function() {
  this.currentBoard = this.spaces.shift();
};


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
}

// ----CONTROLLER----------------------------------------

function GameController(){}

GameController.prototype.init = function(view){
  console.log("Game has been init'ed")
  this.view = view;
  // this.model = model;
  this.player = new Player;
  this.gameStart = false;
  }

GameController.prototype.resetGame = function() {
  console.log('wat')
  this.view.resetGameView();
  console.log('more wat')
  this.player.health = 6
  this.gameStart = false
}

// ----INITIALIZING----------------------------------------
  view = new GameView;
  game = new GameController;
  game.init(view);

  $(document).on("keyup", function() {
    if (game.gameStart === false){
      game.view.fadeTitleOut();
      game.view.changeBackground('#274D00');
      game.gameStart = true
      console.log('game has started')
    }else{
      if (game.player.checkIfAlive(game.player.health) === true){
        game.view.decreaseHealthBar();
        game.player.health -= 1;
        console.log(game.player.health);
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
