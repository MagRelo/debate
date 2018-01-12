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
    this.state = {};
  }

  componentDidMount(){
    this.props.listQuestions()
  }

  render() {
    return(

      <div>
        <Link
          className="pure-button pure-button-primary"
          to="/questions/add">+ Add</Link>
        <ul>
          {this.props.questionList.map(question => {

            return <li key={question._id}>
              <div>
                <Link to={'/questions/' + question._id}>
                  <p>{question.question}</p>
                </Link>
              </div>
            </li>

          })}
        </ul>
      </div>


    )
  }
}

export default ComposeQuestion
