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

        <div className='content-container'>

          <p>{this.props.itemObject.message.value}</p>
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
