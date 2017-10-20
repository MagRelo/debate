import React from 'react'

const FollowToggle = ({userId, targetId, isFollowing, followUserClick, unFollowUserClick}) => {

  return(
    <div className="pure-button-group" role="group" aria-label="follow buttons">

      {isFollowing ?
        <button
          className="pure-button pure-button-active"
          onClick={(event) => unFollowUserClick(event, userId, targetId)}>Unfollow
        </button>
      :
        <button
          className={"pure-button"}
          onClick={(event) => followUserClick(event, userId, targetId)}>Follow
        </button>
      }

    </div>
  )
}

export default FollowToggle
