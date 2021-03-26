import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
        nWrong: 0, 
        guessed: new Set(), 
        answer: randomWord()
    }    
    this.handleGuess = this.handleGuess.bind(this);
    this.guessedWord = this.guessedWord.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  restart(evt) {
      this.setState(st => ({
        nWrong: 0, 
        guessed: new Set(), 
        answer: randomWord(),
      }))
  }


  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }


  render() {
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const gameOver = this.state.nWrong >= this.props.maxWrong
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <p>You have {this.state.nWrong} wrong guess{this.state.nWrong !== 1 &&"es"}!</p>
        <img src={this.props.images[this.state.nWrong]} alt={`You have guessed ${this.state.nWrong} letters wrong!`}/>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {isWinner && <h2>You Win!</h2>}
        {gameOver && <h2>Sorry, You Lose! The word we were looking for was {this.state.answer}</h2>}
        {!isWinner && !gameOver && <p className='Hangman-btns'>{this.generateButtons()}</p>}
        
        <button id="Hangman-restart" onClick={this.restart}>RESTART</button>
        
      </div>
    );
  }
}

export default Hangman;
