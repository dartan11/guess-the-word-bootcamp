import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      guessesLeft: 5,
      // Insert form input state here
      input: "",
      reset: false
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here

  changeHandler = (event) => {
    this.setState({
      input: event.target.value
    })
    console.log(this.state.input)
  }

  submitHandler = (e) => {
    e.preventDefault()

    if (this.state.guessedLetters.includes(this.state.input)) {
      this.setState({ input: "" })
      alert("You have already guessed this letter!")
    } else if (this.state.input === "" || !isNaN(this.state.input)) {
      this.setState({ input: "" })
      alert("Please input a valid guess")
    }

    else this.setState(state => ({
      // guessedLetters: [...this.state.guessedLetters, this.state.input]
      guessedLetters: state.guessedLetters.concat(state.input.toLowerCase()),
      input: "",
      guessesLeft: state.guessesLeft - 1
    }))
    console.log(this.state.guessedLetters, this.state.input, this.state.guessesLeft)
  }

  resetFunction = (e) => {
    e.preventDefault();
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 5,
      input: "",
      reset: false
    })
  }

  componentDidUpdate(_, prevState) {
    if (this.state.guessedLetters !== prevState.guessedLetters) {
      const currWordSet = new Set([...this.state.currWord])
      for (let i = 0; i < this.state.guessedLetters.length; i++) {
        if (currWordSet.has(this.state.guessedLetters[i])) {
          currWordSet.delete(this.state.guessedLetters[i])
        }
      }
      console.log(this.state.reset)
      if (currWordSet.size === 0) {
        this.setState({ reset: true })
        console.log(this.state.reset)
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3>Input</h3>
          <p> {this.state.reset ? `You have guessed correctly` : null}</p>
          <p> {this.state.guessesLeft === 0 && !this.state.reset ? `You have run out of guesses` : `Number of guesses left: ${this.state.guessesLeft}`}</p><br />
          {/* Insert form element here */}
          <form>
            <label>Input your guess here:</label><br />
            <input type="text" name="input" value={this.state.input} disabled={this.state.guessesLeft === 0 || this.state.reset} onChange={this.changeHandler} />
            <br />
            <input type="submit" onClick={this.state.reset || this.state.guessesLeft === 0 ? this.resetFunction : this.submitHandler} value={this.state.reset || this.state.guessesLeft === 0 ? "reset" : "submit"} />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
