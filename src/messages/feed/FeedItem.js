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

        {this.props.itemType === 'Message' ?
          <div>
            <div>
              <div className="time-block">
                  <time>{this.formatTimestamp(this.props.timestamp)}</time>
              </div>
              <img className="profile-logo" src={this.props.actor.avatarUrl}></img>
              <span className="follow-name">{this.props.actor.name}</span>
            </div>
            <div className='content-container'>
              <p dangerouslySetInnerHTML={this.createMarkup(this.props.itemObject.text)} />
            </div>

            {this.props.currentUser._id !== this.props.actor._id ?
              <div className='button-container' role='group' aria-label='message actions'>
                <DiscardButton userName={this.props.actor.name}/>
              </div>
              : null // only show this button if the activity is from another user
            }


          </div>
          : null
        }

        {this.props.itemType === 'Follow' ?
          <div className="follow-container">
            <div className="time-block">
                <time>{this.formatTimestamp(this.props.timestamp)}</time>
            </div>
            <p>
              <span className="follow-name">{this.props.itemObject.user.name}</span>
              &nbsp;introduced&nbsp;
            </p>

            <Link to="/home">
              <span>
                <img className="profile-logo"
                  src={this.props.itemObject.target.avatarUrl}></img>
                <span className="follow-name">{this.props.itemObject.target.name}</span>
              </span>
            </Link>

          </div>
          : null
        }
      </div>
    )
  }
}


FeedItem.defaultProps = {
  avatarUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
}

export default FeedItem
