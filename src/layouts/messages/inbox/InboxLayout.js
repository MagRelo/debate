import React, { Component } from 'react'
import { Link } from 'react-router'


import Compose from '../compose/ComposeContainer'
import FeedContainer from './FeedContainer'


class InboxLayout extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Compose/>
            <hr></hr>

            <h1>Inbox</h1>
            <FeedContainer/>

          </div>
        </div>
      </main>
    )
  }
}

export default InboxLayout
