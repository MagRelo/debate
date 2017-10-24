import React from 'react'

const FollowToggle = ({userId, targetId, isFollowing, followUserClick, unFollowUserClick}) => {

  return(
    <div className="pure-button-group" role="group" aria-label="follow buttons">

      {isFollowing ?
        <button
          className="pure-button pure-button-primary"
          onClick={(event) => unFollowUserClick(event, userId, targetId, 7)}>Sell
        </button>
      :
        <button
          className={"pure-button pure-button-primary"}
          onClick={(event) => followUserClick(event, userId, targetId, 7)}>Buy
        </button>
      }

    </div>
  )
}

export default FollowToggle
