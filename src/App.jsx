import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card'; // Adjust the path as needed
import Footer from './components/Footer'; // Adjust the path as needed
import Header from './components/Header'; // Adjust the path as needed

const TOTAL_PAIRS = 10;
const MAX_POKEMON_ID = 649;
const MIN_POKEMON_ID = 1;

const App = () => {
  const apiURL = "https://raw.githubusercontent.com/PokeAPI/sprites/ceff190a63a58c266a2d8bc10525f56a83ff3992/sprites/pokemon/other/dream-world/";

  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);

  const generatePairs = () => {
    let pairs = [];
    for (let i = 0; i < TOTAL_PAIRS; i++) {
      const id = Math.floor(Math.random() * (MAX_POKEMON_ID - MIN_POKEMON_ID + 1)) + MIN_POKEMON_ID;
      pairs.push({ id, uniqueID: i * 2, flipped: false, found: false, animating: false, animatingFlipped: false });
      pairs.push({ id, uniqueID: i * 2 + 1, flipped: false, found: false, animating: false, animatingFlipped: false });
    }
    return pairs;
  };

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const flipCard = (id, uniqueID) => {
    let newCards = [...cards];
    newCards.forEach(card => {
      if (card.id === id && card.uniqueID === uniqueID) {
        card.flipped = !card.flipped;
        card.animating = true;
      }
    });
    setCards(newCards);
    setMoves(moves => moves + 1);
    checkWin();
  };

  const checkPair = () => {
    let newCards = [...cards];
    let flippedCards = newCards.filter(card => card.flipped && !card.found);
    if (flippedCards.length === 2) {
      if (flippedCards[0].id === flippedCards[1].id) {
        flippedCards.forEach(card => {
          card.found = true;
          card.animating = false;
          card.animatingFlipped = true;
        });
      } else {
        flippedCards.forEach(card => {
          card.animatingFlipped = true;
        });
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.flipped = false;
            card.animating = false;
            card.animatingFlipped = false;
          });
        }, 800);
      }
    }
    setCards(newCards);
  };

  const checkWin = () => {
    setCards((prevCards) => {
      let foundCards = prevCards.filter(card => card.found);
      if (foundCards.length === prevCards.length) {
        alert(`You won in ${timer} seconds and ${moves} moves!`);
        clearInterval(window.timerInterval);
      }
      return prevCards;
    });
  };

  const flipAllCards = () => {
    setCards((prevCards) => {
      let newCards = prevCards.map(card => ({ ...card, flipped: true, animatingFlipped: true }));
      setTimeout(() => {
        setCards(newCards.map(card => ({ ...card, flipped: false, animatingFlipped: false })));
      }, 3500);
      return newCards;
    });
  };

  const initializeCards = () => {
    let pairs = generatePairs();
    pairs.forEach((pair) => {
      pair.name = `Pokemon #${pair.id}`;
      pair.image = `${apiURL}${pair.id}.svg`;
    });
    return shuffle(pairs);
  };

  const startGame = () => {
    setTimer(0);
    setMoves(0);
    let shuffledPairs = initializeCards();
    setCards(shuffledPairs);
    setTimeout(() => {
      flipAllCards();
    }, 500);
    clearInterval(window.timerInterval);
    window.timerInterval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  };

  useEffect(() => {
    if (moves > 0) {
      checkPair();
      checkWin();
    } else if (timer === 0) {
      startGame();
    }
  }, [moves]);

  useEffect(() => {
    return () => {
      clearInterval(window.timerInterval);
    };
  }, []);

  return (
    <div className="App">
      <Header timer={timer} moves={moves} startGame={startGame} />
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={card.id}
            name={card.name}
            image={card.image}
            flipped={card.flipped}
            found={card.found}
            flipCard={flipCard}
            uniqueID={card.uniqueID}
            animating={card.animating}
            cards={cards}
            animatingFlipped={card.animatingFlipped}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
