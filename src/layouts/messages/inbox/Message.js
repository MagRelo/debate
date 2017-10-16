import React, { Component } from 'react'
import { Link } from 'react-router'

import moment from 'moment'

import ProfileInfo from './ProfileInfo'
import ReplyButton from './ReplyButton'
import DiscardButton from './DiscardButton'

class Message extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  formatTimestamp(timestamp){
    return moment(timestamp).fromNow()
  }

  render() {
    return(
      <div className='feedItem'>

        <div className="time-block">
            <time>{this.formatTimestamp(this.props.itemObject.timestamp)}</time>
        </div>

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
