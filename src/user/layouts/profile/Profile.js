import React, { Component } from 'react'

import ProfileInfo from './ProfileInfo'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <ProfileInfo profileObject={this.props.testData} />
            <hr></hr>
            <p>Change these details in UPort to see them reflected here.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
