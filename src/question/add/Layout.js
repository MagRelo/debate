import React, { Component } from 'react'
import { Link } from 'react-router'

// Editor elements
import Editor from 'react-medium-editor';

import {Tokenizer}  from 'react-typeahead';
  //
  // <fieldset>
  //   <label>To:</label>
  //   <Tokenizer
  //     options={this.userList()}
  //     placeholder="Type to add names..."
  //     onTokenAdd={function(token) {}}
  //   />
  // </fieldset>

class ComposeQuestion extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {};

  }

  // Form functions
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addQuestion({
      'question': this.state.question,
      'answerOne': this.state.answerOne,
      'answerTwo': this.state.answerTwo,
    })
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

        <fieldset>
          <label>Question</label>
          <input className="pure-input"
            type="text"
            name="question"
            onChange={this.handleChange.bind(this)}>
          </input>
        </fieldset>

        <fieldset>
          <label>Answer #1</label>
          <input className="pure-input"
            type="text"
            name="answerOne"
            onChange={this.handleChange.bind(this)}>
          </input>
        </fieldset>

        <fieldset>
          <label>Answer #2</label>
          <input className="pure-input"
            type="text"
            name="answerTwo"
            onChange={this.handleChange.bind(this)}>
          </input>
        </fieldset>


        <button
          type="submit"
          className="pure-button pure-button-primary"> Submit
        </button>
      </form>

    )
  }
}

export default ComposeQuestion
