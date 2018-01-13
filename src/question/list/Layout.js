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
          to="/questions/add">+ Add Question
        </Link>

        <ul>
          {this.props.questionList.map(question => {

            return <Link style={{textDecoration: 'none'}} to={'/questions/' + question._id}>
                  <li key={question._id}
                    style={{listStyle: 'none', border: 'solid 1px white', padding: '1em', marginBottom: '1em'}}>
                    <div style={{ color: 'white', textDecoration: 'none', fontSize: '20px'}}>
                      <span style={{float: 'right'}}>comments: {question.comments.length}</span>
                      <span>{question.question}</span>
                    </div>
                  </li>
                </Link>

          })}
        </ul>

      </div>


    )
  }
}

export default ComposeQuestion
