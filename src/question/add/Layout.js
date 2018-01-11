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

    this.state = {
      modalIsOpen: false,
      text: 'intitial text'
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Modal functions
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  // Form functions
  handleChange(text) {
    this.setState({text: text})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({modalIsOpen: false});
    this.props.onMessageSubmit(this.state.text, this.props.user)
  }



  userList(){
    return this.props.user.userList.map(user => {return user.name})
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

        <fieldset>
          <label>Question</label>
          <input className="pure-input"
            type="text">
          </input>
        </fieldset>

        <fieldset>
          <label>Answer #1</label>
          <input className="pure-input"
            type="text">
          </input>
        </fieldset>

        <fieldset>
          <label>Answer #2</label>
          <input className="pure-input"
            type="text">
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
