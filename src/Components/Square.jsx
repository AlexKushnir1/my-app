import React from "react";
import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: " ", // Початковий знак 
    };
    this.currentSign = "x"; // 
  }

  handleSquareClick = async () => {
    const { x, y, makeMove, startNewGame } = this.props;
  
    if (makeMove) {
      const response = await fetch('http://localhost:8080/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y, sign: this.currentSign }),
      });
  
      if (response.ok) {
        const gameState = await response.json();
        makeMove(gameState);
  
        // Оновлюємо стан компонента, щоб показати зміну знаку
        this.setState({ sign: this.currentSign });
  
        // Змінюємо поточний знак після кожного успішного кліку
        this.currentSign = this.currentSign === "x" ? "o" : "x";
      } else {
        // Обробка помилки
      }
    }
  
    if (startNewGame) {
      const response = await fetch('http://localhost:8080/new_game');
  
      if (response.ok) {
        const gameState = await response.json();
        startNewGame(gameState);
      } else {
        // Обробка помилки
      }
    }
  }

  render() {
    return (
      <button className="square" onClick={this.handleSquareClick}>
        {this.state.sign}
      </button>
    );
  }
}

export default Square;