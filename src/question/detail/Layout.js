import React, { Component } from 'react'
import { Link } from 'react-router'

import AddCommentBox from './AddComment'


class QuestionDetail extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      selectedComments: []
    }
  }

  componentDidMount(){
    this.props.getQuestion(this.props.params.id)
  }

  handleSubmitComment(text){
    this.props.commentSubmit(text, this.props.params.id, {user: 'test'})
  }

  selectComment(commentId){
    this.setState(prevState => {
      if(~prevState.selectedComments.indexOf(commentId)){
        return {selectedComments: prevState.selectedComments}
      }
      const allSelections = [...prevState.selectedComments, commentId]
      const latestSelections = allSelections.slice(-3)
      return {selectedComments: latestSelections}
    })
  }

  answerOne(vote){
    this.props.voteSubmit(1, this.props.params.id, {user: 'test'})
  }
  answerTwo(vote){
    this.props.voteSubmit(2, this.props.params.id, {user: 'test'})
  }

  render() {
    return(

      <div>
        <h1>{this.props.question}</h1>

        <h2>Comments, Sources</h2>
        {this.props.comments.map(comment => {
            return <div style={{border: 'solid 1px', padding: '0.5em', marginBottom: '1em'}} key={comment.text}>
              <p>{comment.text}</p>

              {~this.state.selectedComments.indexOf(comment._id) ?
                <p>Selected!</p>
                :
                <button className="pure-button pure-button-primary"
                  onClick={this.selectComment.bind(this, comment._id)}> Select
                </button>
              }


            </div>
          })
        }
        <AddCommentBox
          loading={this.props.commentLoading}
          submitFunction={this.handleSubmitComment.bind(this)} />

        <h2>Predict the consensus</h2>

        {this.props.voteLoading ?
          <div className="loader"></div>
        :

          <div>
            <h3>My top comments:</h3>
            {this.props.comments
              .filter(comment => ~this.state.selectedComments.indexOf(comment._id))
              .map(comment => {
                return <div style={{border: 'solid 1px', padding: '0.5em', marginBottom: '1em'}} key={comment.text}>
                  <p>{comment.text}</p>
                </div>
              })
            }
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <div>
                <button
                  className="pure-button pure-button-primary"
                  onClick={this.answerOne.bind(this)} >{this.props.answerOne}</button>
              </div>
              <div>
                <button className="pure-button pure-button-primary"
                  onClick={this.answerTwo.bind(this)} >{this.props.answerTwo}</button>
              </div>
            </div>
          </div>

        }


      </div>


    )
  }
}

export default QuestionDetail
