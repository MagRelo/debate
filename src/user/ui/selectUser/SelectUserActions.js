import { browserHistory } from 'react-router'

import {USER_LOGGED_IN} from '../loginbutton/LoginButtonActions'

// export const USER_SIGNUP = 'USER_SIGNUP'
function userSignUp(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const USER_LIST_UPDATE = 'USER_LIST_UPDATE'
function userListUpdate(userListArray) {
  return {
    type: USER_LIST_UPDATE,
    payload: userListArray
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

        dispatch(userSignUp(userObject))
        return browserHistory.push('/feed')
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

        if(rawResponse.status !== 200){
          throw new Error(rawResponse.text)
        }

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
