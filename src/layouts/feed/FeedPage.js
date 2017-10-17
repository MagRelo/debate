import React, { Component } from 'react'
import { Link } from 'react-router'

import FeedContainer from './FeedContainer'


class Feed extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <h1>Feed</h1>
            <FeedContainer/>


          </div>
        </div>
      </main>
    )
  }
}

export default Feed
