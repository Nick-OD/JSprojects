//Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLEft = 3;


//UI Elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listenet
game.addEventListener('mousedown',function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//Listen for Guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //Validate
  if (isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`);
  }

//Check if Won
if (guess === winningNum){
   gameOver(true, `${winningNum} is correct, YOU WIN!`);
} else{
    //Worng number
    guessesLEft -= 1;
  if(guessesLEft === 0){
    //Game over - lost
    gameOver(false,`Game Over, you lost. The correct number was ${winningNum}`)
  } else{
    //Game continues

      //Change border color
      guessInput.style.borderColor = 'red';

    //Clear Input
    guessInput.value = '';

    //Tell User
    setMessage(`${guess} is not correct, ${guessesLEft} guesses left`, 'red');
  }
}

});

//Game Over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
   //Disable Input
   guessInput.disabled = true;
   //Change border color
   guessInput.style.borderColor = 'green';
   message.style.color = color;
   //Set message
   setMessage(msg);

   //Play Again
   guessBtn.value = 'Play Again';
   guessBtn.className += 'play-again';
}

//Get Random Winning Num
function getWinningNum(min, max){
  Math.floor(Math.random() * (max-min+1)+min);
}

//Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}