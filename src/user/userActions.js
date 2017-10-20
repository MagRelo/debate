import { browserHistory } from 'react-router'

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

export function selectUser(name) {
  return function(dispatch) {

    return fetch('/api/user/' + name,
      {
        method: "GET",
      }
    ).then(rawResponse => {

        if(rawResponse.status !== 200){
          throw new Error(rawResponse.text)
        }

        return rawResponse.json()
      }
    ).then(userObject => {

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
    ).then(userList => {
        return dispatch(userListUpdate(userList))
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
    ).then(userList => {
        return dispatch(userListUpdate(userList))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function getUsers() {
  return function(dispatch) {

    return fetch('/api/user/list',
      {
        method: "GET",
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
