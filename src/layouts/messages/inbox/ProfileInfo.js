import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return(
      <img className="profile-logo" src={this.props.avatarUrl}></img>
    )
  }
}

Profile.defaultProps = {
  avatarUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
}

export default Profile
