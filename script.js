const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let flipped = 0;
let notClicked = false;
let score = 0;
let lowScore = localStorage.getItem("low-score");
const startButton = document.getElementById('start');
const content = document.getElementById('content');

startButton.addEventListener('click', () => {
  content.style.display = 'block';
});


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
const moveElement = document.getElementById("moves");
moveElement.innerText = lowScore;
const scoreElement = document.getElementById("score");

  // TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (notClicked) return;
  if (event.target.classList.contains('shown')) return;
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!firstCard || !secondCard) {
    currentCard.classList.add("shown");
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null : currentCard;
    score += 1;
    scoreElement.innerText = score;
  }

  if (firstCard && secondCard) {
    notClicked = true;
    let class1 = firstCard.className;
    let class2 = secondCard.className;

    if (class1 === class2) {
      flipped += 2;
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      notClicked = false;
    } 
    
    else {
      setTimeout(function() {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("shown");
        secondCard.classList.remove("shown");
        firstCard = null;
        secondCard = null;
        notClicked = false;
      }, 1000);
    }
  }

if (score < lowScore || Infinity){
localStorage.setItem("low-score", score);
};
  


  if (flipped === COLORS.length) alert("GAME OVER!");
};

// when the DOM loads
createDivsForColors(shuffledColors);