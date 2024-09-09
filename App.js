import React, { useState, useEffect } from 'react';
import './index.css';

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const shuffledCards = shuffleArray([...cardValues, ...cardValues]);
    setCards(shuffledCards.map((value, index) => ({ id: index, value })));
  }, []);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.includes(card) || matchedCards.includes(card)) {
      return;
    }

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].value === newFlippedCards[1].value) {
        setMatchedCards([...matchedCards, ...newFlippedCards]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="memory-game">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`memory-card ${flippedCards.includes(card) || matchedCards.includes(card) ? 'flipped' : ''}`}
          onClick={() => handleCardClick(card)}
        >
          {flippedCards.includes(card) || matchedCards.includes(card) ? card.value : ''}
        </div>
      ))}
    </div>
  );
};

export default App;
