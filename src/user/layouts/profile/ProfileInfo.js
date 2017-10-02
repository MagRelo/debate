import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return(
      <span>
        <img className="profile-logo" src={'https://ipfs.io' + this.props.profileObject.image.contentUrl}></img>
        <p><strong>Name: </strong>{this.props.profileObject.name}</p>
        <p><strong>Phone: </strong>{this.props.profileObject.phone}</p>
        <p><strong>Country: </strong>{this.props.profileObject.country}</p>
      </span>
    )
  }
}

export default Profile
