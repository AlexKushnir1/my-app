import React from "react";
import './Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.x= props.x;
    this.y= props.y;
    this.sign = props.sign;
    this.makeMove = props.makeMove;
  }

  handleSquareClick = async () => {
    if (this.makeMove) {
      console.log("this.x and this.y in square ", this.x, this.y)
      this.makeMove(this.x,this.y)
    } else {
      throw Error("Make move must be provided")
    }
  }


render() {
  return (
    <button className="square" onClick={this.handleSquareClick}>
      {this.sign}
    </button>
  );
}
}

export default Square;