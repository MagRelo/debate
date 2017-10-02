import React, { Component } from 'react'
import { Link } from 'react-router'

import ProfileInfo from './ProfileInfo'
import ReplyButton from './ReplyButton'
import DiscardButton from './DiscardButton'

class Message extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

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

        <div className='button-container' role='group' aria-label='message actions'>
          <ReplyButton/>
          <DiscardButton/>
        </div>

      </div>
    )
  }
}

export default Message
