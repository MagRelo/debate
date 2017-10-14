import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return(
      <img className="profile-logo" src={this.props.profileObject.image.contentUrl}></img>
    )
  }
}

export default Profile
