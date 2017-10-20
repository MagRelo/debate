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

export function loginUser(name) {
  return function(dispatch) {

    fetch('/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name
        })
    })
    .then(rawResponse => {
      if(rawResponse.status !== 200){ throw new Error(rawResponse.text)}
      return rawResponse.json()
    })
    .then(userObject => {
      dispatch(getTimelineByUser(userObject._id))
      dispatch(getMessagesByUser(userObject._id))
      return dispatch(userLoggedIn(userObject))
    })
    .catch(error => {
      return console.error('action error', error)
    })

    // Location stuff(?)
    var currentLocation = browserHistory.getCurrentLocation()
    if ('redirect' in currentLocation.query){
      return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    }

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
      return browserHistory.push('/feed')
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
        return browserHistory.push('/feed')
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function followUser(userId, targetId) {
  return function(dispatch) {

    return fetch('/api/follow', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          target: targetId
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

export function unFollowUser(userId, targetId) {
  return function(dispatch) {

    return fetch('/api/follow', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          target: targetId
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
