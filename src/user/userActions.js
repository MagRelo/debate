import { browserHistory } from 'react-router'

import { getTimelineByUser, getMessagesByUser } from '../messages/MessageActions'

export const USER_LIST_UPDATE = 'USER_LIST_UPDATE'
function userListUpdate(userListArray) {
  return {
    type: USER_LIST_UPDATE,
    payload: userListArray
  }
}

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

export function loginUser(user) {
  return function(dispatch) {

    dispatch(getTimelineByUser(user._id))
    dispatch(getMessagesByUser(user._id))
    dispatch(getUsers(user._id))
    dispatch(userLoggedIn(user))

    // Location stuff(?)
    var currentLocation = browserHistory.getCurrentLocation()
    if ('redirect' in currentLocation.query){
      return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    }

    // send to profile
    return browserHistory.push('/profile')

  }
}

export function logoutUser() {
  return function(dispatch) {

    dispatch(userLoggedOut())

    // Redirect home.
    return browserHistory.push('/')
  }
}

export function submitUser(name, avatarUrl) {
  return function(dispatch) {

    return fetch('/api/user',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          avatarUrl: avatarUrl
        })
    })
    .then(rawResponse => {
      if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
      return rawResponse.json()
    })
    .then(userObject => {
      dispatch(userLoggedIn(userObject))
      return browserHistory.push('/profile')
    })
    .catch(error => {
      return console.error('action error', error)
    })

  }
}

export function selectUser(userId) {
  return function(dispatch) {

    return fetch('/api/user/' + userId,{
        method: "GET",
    }).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
    }).then(userObject => {
        dispatch(getTimelineByUser(userObject._id))
        dispatch(getMessagesByUser(userObject._id))
        dispatch(getUsers(userObject._id))
        dispatch(userLoggedIn(userObject))
        return browserHistory.push('/profile')
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function followUser(userId, targetId, tokensToPurchase) {
  return function(dispatch) {

    return fetch('/api/follow', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          target: targetId,
          tokensToPurchase: tokensToPurchase
        })
      }).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }).then(userObject => {
        dispatch(userLoggedIn(userObject))
        dispatch(getTimelineByUser(userId))
        dispatch(getMessagesByUser(userId))
        return dispatch(getUsers(userId))
      }).catch(error => {
        console.error('action error', error)
        return
      })

  }
}

export function unFollowUser(userId, targetId, tokensToSell) {
  return function(dispatch) {

    return fetch('/api/follow', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          target: targetId,
          tokensToSell: tokensToSell
        })
    }).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(userObject => {
      dispatch(userLoggedIn(userObject))

      dispatch(getTimelineByUser(userId))
      dispatch(getMessagesByUser(userId))
      return dispatch(getUsers(userId))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function getUsers(userId) {
  return function(dispatch) {

    return fetch('/api/user/list',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(userListArray => {
        return dispatch(userListUpdate(userListArray))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}
