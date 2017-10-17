import { browserHistory } from 'react-router'

export const USER_SIGNUP = 'USER_SIGNUP'
function userSignUp(user) {
  return {
    type: USER_SIGNUP,
    payload: user
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
      }
    ).then(rawResponse => {

        if(rawResponse.status !== 200){
          throw new Error(rawResponse.text)
        }

        return rawResponse.json()
      }
    ).then(userObject => {

        return dispatch(userSignUp(userObject))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })



    // Redirect home.
    return browserHistory.push('/')
  }
}
