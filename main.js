
$(document).ready(function() {

// ----VIEW----------------------------------------------

function GameView(){}

GameView.prototype.changeBackground = function(color) {
  $('body').css('background-color', color);
}

GameView.prototype.fadeTitle = function() {
  $('#title').fadeOut('slow');
}

GameView.prototype.showDeath = function() {
  $('#dead').fadeIn();
}

GameView.prototype.decreaseHealthBar = function() {
  console.log('You lost health!')
    // $('#health-bar').effect('shake');
    $('#health-bar li:last').remove()
  }
// ----MODELS--------------------------------------------


// >>>GAMEBOARD
function GameBoard(){};

GameBoard.prototype.spaces = function(spaces) {
  this.spaces = spaces
};

GameBoard.prototype.traverseBoard = function() {

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


// ----INITIALIZING----------------------------------------
  view = new GameView;
  game = new GameController;
  game.init(view);

  $(document).on("keyup", function() {
    if (game.gameStart === false){
      game.view.fadeTitle();
      game.view.changeBackground('#274D00');
      game.gameStart = true
      console.log('game has started')
    }else{
      if (game.player.checkIfAlive(game.player.health) === true){
        game.view.decreaseHealthBar();
        game.player.health -= 1;
        console.log(game.player.health)
      }else if (game.player.checkIfAlive(game.player.health) === false){
        console.log('ye died')
        game.view.showDeath();
      }
    }
  });
})
