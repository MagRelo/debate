import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return(
      <span>
        <img className="profile-logo" src={this.props.profileObject.image.contentUrl}></img>
        <p><strong>Name: </strong>{this.props.profileObject.name}</p>
        <p><strong>Phone: </strong>{this.props.profileObject.phone}</p>
        <p><strong>Country: </strong>{this.props.profileObject.country}</p>
      </span>
    )
  }
}

Profile.defaultProps = {
  profileObject: {
    name: 'default name',
    phone: '555-555-5555',
    country: 'default country',
    image: {
      contentUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
    }
  }
}


export default Profile
