import React, { Component } from 'react'
import { Link } from 'react-router'

import FeedContainer from '../../messages/feed/FeedContainer'
import Compose from '../../messages/compose/ComposeContainer'


class Feed extends Component {
  constructor(props) {
    super()
    // authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <Compose/>

            <hr></hr>

            <FeedContainer messages={this.props.feedList}/>

          </div>
        </div>
      </main>
    )
  }
}

export default Feed
