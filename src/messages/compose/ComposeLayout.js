import React, { Component } from 'react'
import { Link } from 'react-router'

import Modal from 'react-modal';
const customStyles = {
  overlay: {
   backgroundColor   : 'rgba(16, 58, 82, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-40%',
    transform             : 'translate(-50%, -50%)',
    padding               : 'none'
  }
};

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

class ComposeMessage extends Component {
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

  render() {
    return(

      <div>

        <div className="compose-container">

          <div className="compose-title-container">
            <span className="title">Add Post</span>
          </div>

          <div className="compose-editor-container">

            {this.props.messages.loading ?

              <div>
                <div className="loader"></div>
              </div>

            :

              <form className="pure-form pure-form-stacked " onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                  <label>Comment:</label>
                  <Editor
                    className="editor-input"
                    text=""
                    onChange={this.handleChange.bind(this)}
                  />
                </fieldset>

                <button
                  type="submit"
                  className="pure-button pure-button-primary"> Submit
                </button>

              </form>

            }

          </div>

        </div>

      </div>


    )
  }
}

export default ComposeMessage
