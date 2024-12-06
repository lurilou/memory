const cards = document.querySelectorAll(".memory-card");
shuffle();
cards.forEach((card) => card.addEventListener("click", flipCard));
let firstCard, secondCard;

function shuffle() {
    const positions = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16",];
  for (let card of cards) {
    let randomIndex = Math.floor(Math.random() * 16);
    card.style.order = positions[randomIndex];
    positions.splice(randomIndex, 1);
  }
}

function flipCard() {
  if (!firstCard) {
    this.classList.toggle("flip");
    this.removeEventListener("click", flipCard);
    firstCard = this;
  } else if (!secondCard) {
    this.classList.toggle("flip");
    this.removeEventListener("click", flipCard);
    secondCard = this;

    setTimeout(() => {
      compareCards(firstCard, secondCard);
    }, 1200);
  }
}

function compareCards(cardOne, cardTwo) {
  if (
    cardOne.querySelector(".front-face").alt ===
    cardTwo.querySelector(".front-face").alt
  ) {
    checkForGameEnd();
  } else {
    unflipCard(cardOne);
    unflipCard(cardTwo);
  }
  firstCard = null;
  secondCard = null;
}

function unflipCard(cardToFlip) {
  cardToFlip.classList.toggle("flip");
  cardToFlip.addEventListener("click", flipCard);
}

function checkForGameEnd() {
    for (const card of cards) {
        if (!card.classList.contains("flip")) return;
    }
    let popup = document.querySelector(".success");
    popup.classList.remove("hidesuccess");
}

function newGame() {
    cards.forEach((card) => card.addEventListener("click", flipCard));
    cards.forEach((card) => card.classList.toggle("flip"));
    document.querySelector(".success").classList.add("hidesuccess");
    setTimeout(() => {
      shuffle();
    }, 500);
}
