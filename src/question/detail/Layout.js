import React, { Component } from 'react'
import { Link } from 'react-router'

import AddCommentBox from './AddComment'


class QuestionDetail extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      selectedComments: [,,]
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
    this.state({selectedVote: 1})
  }
  answerTwo(vote){
    this.state({selectedVote: 2})
  }

  submitVote(){
    this.props.voteSubmit(this.state.selectedVote, this.state.selectedComments, this.props.params.id, {user: 'test'})
  }

  createMarkup(content) {
    return {__html: content};
  }

  render() {
    return(

      <div>
        <Link to="/" className="pure-button pure-button-primary"> &#9668;&nbsp;Questions List</Link>

        <h1>{this.props.question}</h1>

        <h2>Comments, Sources</h2>
        {this.props.comments.map(comment => {
            return <div style={{background: '#042644', padding: '0.5em', marginBottom: '1em'}} key={comment.text}>

              {~this.state.selectedComments.indexOf(comment._id) ?
                <p style={{float: 'right'}}>Selected!</p>
                :
                <button style={{float: 'right'}} className="pure-button pure-button-primary"
                  onClick={this.selectComment.bind(this, comment._id)}> Select
                </button>
              }

              <p dangerouslySetInnerHTML={this.createMarkup(comment.text)}></p>

            </div>
          })
        }
        <AddCommentBox
          loading={this.props.commentLoading}
          submitFunction={this.handleSubmitComment.bind(this)} />

        <hr></hr>

        {this.props.voteLoading ?
          <div className="loader"></div>
        :

          <div>

            <h3>1: Select three top comments</h3>
            {this.props.comments
              .filter(comment => ~this.state.selectedComments.indexOf(comment._id))
              .map(comment => {
                return <div style={{background: '#042644', padding: '0.5em', marginBottom: '1em'}} key={comment.text}>
                  <p dangerouslySetInnerHTML={this.createMarkup(comment.text)}></p>
                </div>
              })
            }

            <h3>2: Select your prediction</h3>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <div>
                <button
                  className="pure-button pure-button-primary"
                  onClick={this.answerOne.bind(this)}>{this.props.answerOne}</button>
              </div>
              <div>
                <button className="pure-button pure-button-primary"
                  onClick={this.answerTwo.bind(this)}>{this.props.answerTwo}</button>
              </div>
            </div>

            <h3>3: Submit Your Vote</h3>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <div>
                <button
                  className="pure-button pure-button-primary"
                  onClick={this.submitVote.bind(this)}>Submit Vote</button>
              </div>
            </div>

          </div>

        }


      </div>


    )
  }
}

export default QuestionDetail
