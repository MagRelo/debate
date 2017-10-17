import React, { Component } from 'react'

import ProfileInfo from './ProfileInfo'

import LogoutButtonContainer from '../../ui/logoutbutton/LogoutButtonContainer'

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
            <LogoutButtonContainer/>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
