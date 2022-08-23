//card options
const beePics = [
  {name:"bee1", img:"beePics/bee1.jpg"},
  {name:"bee2", img:"beePics/bee2.jpg"},
  {name:"bee3", img:"beePics/bee3.jpg"},
  {name:"bee4", img:"beePics/bee4.jpg"},
  {name:"bee5", img:"beePics/bee5.jpg"},
  {name:"bee6", img:"beePics/bee6.jpg"}
];

//double cards
const cardArray = beePics.concat(beePics);

//shuffle cards
function shuffleCards(cardArray) {
  for (let i = cardArray.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
  }
}
shuffleCards(cardArray);
console.log(cardArray);

//create seconds count
let count = 0;
let seconds = document.getElementById("seconds");

function incrementSeconds() {
    count += 1;
    seconds.innerText = count;
}

let secondsCount = setInterval(incrementSeconds, 1000);

//create moves count
let counting = 0;
let moves = document.getElementById("moves");

function incrementMoves() {
    counting += 1;
    moves.innerText = counting;
}

//create game board upside down cards
const grid = document.querySelector(".grid");

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    let card = document.createElement("img"); 
    card.setAttribute("src", "upside down.jpg");
    card.setAttribute("data-id", i);

    card.setAttribute("class", "back"); //add class for card change

    //added div for card change
    const innerCard = document.createElement("div");
    innerCard.setAttribute("class", "innerCard");
    grid.appendChild(innerCard);
    innerCard.appendChild(card) 

    card.addEventListener("click", incrementMoves); //moves count function
    
    card.addEventListener("click", flipCard);   //flip card function
  }
}

//flip card
let cardsChosen = [];
let cardsChosenId = [];

function flipCard() {
  if (cardsChosen.length < 2) {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src",cardArray[cardId].img);
    
    this.setAttribute("class", "front"); //add class for card change

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 1000);   //check for match function
    } 
  }
}

//check for match
let cardsWon = [];
let congrats = document.getElementById("congrats"); //End Game message

function checkForMatch() {
  let cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  //if the same card was clicked twice:
  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "upside down.jpg");
    cards[optionTwoId].setAttribute("src", "upside down.jpg");
    
    cards[optionOneId].setAttribute("class", "back"); //add class for card change
    cards[optionTwoId].setAttribute("class", "back"); //add class for card change
    console.log("same image clicked");

    //if two matching cards were clicked:
  } else if (cardsChosen[0] === cardsChosen[1]) { 
    console.log("match found!");
    cards[optionOneId].setAttribute("src","");
    cards[optionTwoId].setAttribute("src","");

    cards[optionOneId].removeAttribute("class"); //remove class for card change
    cards[optionTwoId].removeAttribute("class"); //remove class for card change

    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);  

    cardsWon.push(cardsChosen);

    //if two different cards were clicked:
  } else {
    cards[optionOneId].setAttribute("src", "upside down.jpg");
    cards[optionTwoId].setAttribute("src", "upside down.jpg");

    cards[optionOneId].setAttribute("class", "back"); //add class for card change
    cards[optionTwoId].setAttribute("class", "back"); //add class for card change
    console.log("not a match");
  }

  cardsChosen = [];
  cardsChosenId = [];
  
  if (cardsWon.length === cardArray.length/2) {
    congrats.textContent = "Congratulations!!! You are the Queen of Bees"; //End Game message
    
    window.setTimeout(function(){location.reload()},4000)
    clearInterval(secondsCount);
  }
}

createBoard();