import React, { Component } from 'react'
import { Link } from 'react-router'

import FeedItem from './FeedItem'

// Servesa foundation creates identities by minting and buying the first 1000 tokens(?)


class Feed extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main>
        {this.props.user.data.messages.slice(0).reverse().map((message) =>
          <FeedItem
            key={message.id}
            itemObject={message.message}/>
        )}
      </main>
    )
  }
}

Feed.defaultProps = {
  messages: []
};

export default Feed
