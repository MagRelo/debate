import React, { Component } from 'react'
import { Link } from 'react-router'

import moment from 'moment'

import ReplyButton from './itemButtons/ReplyButton'
import DiscardButton from './itemButtons/DiscardButton'

// <div class="feed-item blog">
//    <div class="icon-holder"><div class="icon"></div></div>
//    <div class="text-holder col-3-5">
//      <div class="feed-title">Blog Item</div>
//      <div class="feed-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia natus obcaecati consequuntur quis molestias! Minima impedit ad omnis. Libero quibusdam facere dignissimos ut mollitia unde sunt nobis quia, nam quasi!
//      </div>
//    </div><!--End of Text Holder-->
//
//
//   <div class="post-options-holder">
//      <div class= "tools">
//        <i class="fa fa-ellipsis-v" id="postsettings"></i>
//      </div><!--End Tools-->
//    </div><!--End Post Options Holder -->
//
//  </div><!--End of Feed Item-->


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

            <div className="icon-holder">
              <div
                className="icon"
                style={{'backgroundImage': 'url(\'' + this.props.actor.avatarUrl + '\')'}}>
              </div>
            </div>

            <div className="text-holder">
              <div className="time-block">
                <time>{this.formatTimestamp(this.props.timestamp)}</time>
              </div>

              <div className="feed-title">{this.props.actor.name}</div>

              <div className="feed-description">
                <p dangerouslySetInnerHTML={this.createMarkup(this.props.itemObject.text)} />
              </div>
           </div>

           <div className="post-options-holder">
              <div className= "tools">
                <i className="fa fa-ellipsis-v" id="postsettings"></i>

                  {this.props.currentUser._id !== this.props.actor._id ?
                    <div className='button-container' role='group' aria-label='message actions'>
                      <DiscardButton userName={this.props.actor.name}/>
                    </div>
                    : null // only show this button if the activity is from another user
                  }

              </div>
            </div>


          </div>
          : null
        }

        {this.props.itemType === 'Follow' ?
          <div>

            <div className="icon-holder">
              <div
                className="icon"
                style={{'backgroundImage': 'url(\'' + this.props.actor.avatarUrl + '\')'}}>
              </div>
            </div>

            <div className="text-holder">
              <div className="time-block">
                <time>{this.formatTimestamp(this.props.timestamp)}</time>
              </div>

              <div className="feed-title">{this.props.actor.name}</div>

              <div className="feed-description">
                <p>introduced: {this.props.itemObject.target.name}</p>
              </div>
           </div>

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
