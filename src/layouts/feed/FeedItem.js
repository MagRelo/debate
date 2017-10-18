import React, { Component } from 'react'
import { Link } from 'react-router'

import moment from 'moment'

import ReplyButton from './itemButtons/ReplyButton'
import DiscardButton from './itemButtons/DiscardButton'

class FeedItem extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  formatTimestamp(timestamp){
    return moment(timestamp).fromNow()
  }

  createMarkup(value) {
    return {__html: value};
  }

  render() {
    return(
      <div className='feedItem'>

        <div>
            <img className="profile-logo" src={this.props.actor.avatarUrl}></img>
            <span>{this.props.itemObject.create_at}</span>
            <div className="time-block">
                <time>{this.formatTimestamp(this.props.itemObject.timestamp)}</time>
            </div>

        </div>



        <div className='content-container'>
          <p dangerouslySetInnerHTML={this.createMarkup(this.props.itemObject.text)} />
        </div>

        <div className='button-container' role='group' aria-label='message actions'>
          <ReplyButton/>
          <DiscardButton/>
        </div>

      </div>
    )
  }
}


FeedItem.defaultProps = {
  avatarUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
}

export default FeedItem
