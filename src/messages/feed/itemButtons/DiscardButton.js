import React, { Component } from 'react'
import { Link } from 'react-router'



class FeedItem extends Component {
  render() {
    return(
      <button className='pure-button pure-button-danger'> Whack {this.props.userName} </button>      
    )
  }
}

export default FeedItem
