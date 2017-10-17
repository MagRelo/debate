import React, { Component } from 'react'
import { Link } from 'react-router'

import Message from './Message'

// Seversa foundation creates identities by minting and buying the first 1000 tokens(?)


class Feed extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }


  componentDidMount(){
    this.props.getMessages()
  }


  render() {
    return(
      <main>
        {this.props.messages.messages.reverse().map((message) =>
          <Message key={message.id} itemObject={message}/>
        )}
      </main>
    )
  }
}

Feed.defaultProps = {
  messages: []
};

export default Feed
