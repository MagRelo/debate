import React, { Component } from 'react'
import { Link } from 'react-router'

import FeedItem from './FeedItem'

// Servesa foundation creates identities by minting and buying the first 1000 tokens(?)


class Feed extends Component {
  constructor(props, { authData }) {
    super()
  }

  render() {
    return(
      <main>
        {this.props.messages.map((message) =>
          <FeedItem
            key={message.id}
            itemType={message.verb}
            actor={message.actor}
            itemObject={message.object}
            timestamp={message.time}
            currentUser={this.props.currentUser}
            />
        )}
      </main>
    )
  }
}

Feed.defaultProps = {
  messages: []
}

export default Feed
