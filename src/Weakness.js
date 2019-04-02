import React, { Component } from 'react';
import './App.css';

class Weakness extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
	handleInput = (e) => {
    this.setState({value: e.target.value})
	}

  renderWeaknesses = () => {
    return this.props.weaknesses.map(weakness => <li>{weakness}</li>)
  }

  handleFormSubmit =  (e, name) => {
    e.preventDefault()
    this.props.onSubmit(name, this.state.value)
    this.setState({value: ''})
  }

  render() {
    const { character } = this.props
    return (
      <section>
        <h3>Weaknesses:</h3>
        <ul>
          {this.renderWeaknesses()}
        </ul>
        <form>
          <input type='text' value={this.state.value} onInput={this.handleInput}/>
          <input type='submit' value='Submit' onClick={(e) => this.handleFormSubmit(e, character.name)}/>
        </form>
      </section>
    );
  }
}

export default Weakness;
