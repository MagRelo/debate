import React, { Component } from 'react'
import { Link } from 'react-router'

class Inbox extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <h1>Inbox</h1>
            
            <p>If you're seeing this page, you've logged in with UPort successfully. Check out your{' '}
              <Link to="/profile"> Profile</Link>.
            </p>

          </div>
        </div>
      </main>
    )
  }
}

export default Inbox
