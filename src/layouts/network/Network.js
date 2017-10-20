import React, { Component } from 'react'
import { Link } from 'react-router'

import FeedContainer from '../../messages/feed/FeedContainer'


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

            <h1>Network Feed</h1>
            <FeedContainer messages={this.props.feedList}/>

          </div>
        </div>
      </main>
    )
  }
}

export default Feed
