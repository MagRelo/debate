import React, { Component } from 'react'
import { Link } from 'react-router'

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
      text: 'intitial text',
      questions: [
        {link: '1', question: 'is TRON legit or what??', a1: 'Yeah', a2: 'No'},
        {link: '2', question: 'is XRP legit or what??', a1: 'Yeah', a2: 'No'},
        {link: '3', question: 'is ETH legit or what??', a1: 'Yeah', a2: 'No'},
      ]
    };

  }

  onComponentDidLoad(){

  }

  // Form functions
  // handleChange(text) {
  //   this.setState({text: text})
  // }
  // handleSubmit(event) {
  //   event.preventDefault()
  //   this.setState({modalIsOpen: false});
  //   this.props.onMessageSubmit(this.state.text, this.props.user)
  // }

  render() {
    return(

      <div>
        <Link
          className="pure-button pure-button-primary"
          to="/questions/add">+ Add</Link>
        <ul>
          {this.state.questions.map(question => {
              return <li key={question.question}>

                <div>
                  <Link to={'/questions/' + question.link}>
                    <p>{question.question}</p>
                  </Link>
                </div>

              </li>
            })
          }
        </ul>
      </div>


    )
  }
}

export default ComposeQuestion
