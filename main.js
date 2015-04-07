$(document).ready( function() {
  var gameBoard = [];
  var gameStart = false
  $(document).on("keyup", function() {
    if (gameStart === false){
      fadeTitle();
      gameStart = true
    }else{
      console.log('Everything falls apart.')
    }
  });

  var fadeTitle = function() {
    $('body').css('background-color', '#274D00');
    $('#title').fadeOut();
  }

}
)
