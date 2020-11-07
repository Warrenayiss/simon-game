var gamePattern = []
var userClickedPattern = []
var buttonColours = ['red', 'blue', 'green', 'yellow']
var gameStarted = false
var level = -1

$(document).keypress(function () {
  nextSequence()
})

$('.btn').click(function (para) {
  userChosenColor = $(this).attr('id')
  userClickedPattern.push(userChosenColor)
  animatePress(userChosenColor)
  makeSound(userChosenColor)
  checkAnswer(userClickedPattern.length - 1)
})

function makeSound(btn) {
  switch (btn) {
    case 'red':
      var red = new Audio('sounds/red.mp3')
      red.play()
      break

    case 'green':
      var green = new Audio('sounds/green.mp3')
      green.play()
      break

    case 'blue':
      var blue = new Audio('sounds/blue.mp3')
      blue.play()
      break

    case 'yellow':
      var yellow = new Audio('sounds/yellow.mp3')
      yellow.play()
      break
    default:
      
      break
  }
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log('success')
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000)
    }
  } else {
		console.log('wrong')
		var wrong = new Audio('sounds/wrong.mp3')
			wrong.play();
		$("body").addClass("game-over")
		
		setTimeout(() => {
      $("body").removeClass('game-over')
		}, 100)

		startOver();
  }
}

function animatePress(currentColor) {
  setTimeout(1000, function () {
    $('#' + currentColor).addClass('pressed')

    setTimeout(() => {
      $('#' + currentColor).removeClass('pressed')
    }, 100)
  })
}

function startOver() {
	level = -1;
	gameStarted = false;
	gamePattern.slice(0,gamePattern.length);
	$('h1').text("Press A Key to Start")
}

function nextSequence() {
  gameStarted = true
  userClickedPattern.slice(0, userClickedPattern.length)
  var randomNumber = Math.floor(Math.random() * 4)
  var randomNumber2 = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
	gamePattern.push(randomChosenColour)
	select(randomChosenColour);
	setTimeout(() => {
	randomChosenColour = buttonColours[randomNumber2]
	gamePattern.push(randomChosenColour)
	select(randomChosenColour);
	}, 120);

	
	


  

  level++

  $('h1').text('Level ' + level)
}

function select(params) {
	$('#' + params)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)

  makeSound(params)
}