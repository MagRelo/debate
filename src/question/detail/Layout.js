import React, { Component } from 'react'
import { Link } from 'react-router'

import AddCommentBox from './AddComment'


class QuestionDetail extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      commentOpen: true,
      comments: []
    }

  }

  componentDidMount(){
    this.setState({
      link: '3',
      question: 'is ETH legit or what??',
      a1: 'Yeah',
      a2: 'No',
      comments: [
        {text: 'pretty cool'},
        {text: 'link to whitepaper'},
        {text: 'pasta sauce recipe'},
      ]
    })
  }

  handleSubmit(){

  }

  render() {
    return(

      <div>
        <h1>{this.state.question}</h1>

        <h2>Comments, Sources</h2>
        {this.state.comments.map(comment => {
            return <div style={{border: 'solid 1px', padding: '0.5em', marginBottom: '1em'}} key={comment.text}>
              <p>{comment.text}</p>
            </div>
          })
        }

        <AddCommentBox submitFunction={this.props.onCommentSubmit}/>

        <h2>Vote</h2>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <div>
            <button className="pure-button pure-button-primary" >{this.state.a1}</button>
          </div>
          <div>
            <button className="pure-button pure-button-primary" >{this.state.a2}</button>
          </div>
        </div>

      </div>


    )
  }
}

export default QuestionDetail
