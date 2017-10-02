import React, { Component } from 'react'
import { Link } from 'react-router'

import FeedSlashButton from './FeedSlashButton'

import ProfileInfo from './ProfileInfo'

class FeedItem extends Component {
  render() {
    return(
      <div className='feedItem'>

        <span className="profile-container">
          <ProfileInfo profileObject={this.props.itemObject.user} />
        </span>


        <div className='content-container'>
          <h3>{this.props.itemObject.user.name}</h3>
          <p>{this.props.itemObject.item.content}</p>
        </div>

        <div className='button-container'>
          <FeedSlashButton/>
        </div>


      </div>
    )
  }
}

export default FeedItem
