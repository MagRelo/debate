


export const MESSAGE_LIST_UPDATE = 'MESSAGE_LIST_UPDATE'
function messageListUpdate(messageList) {
  return {
    type: MESSAGE_LIST_UPDATE,
    payload: messageList
  }
}

export const MESSAGE_SUBMITTED = 'MESSAGE_SUBMITTED'
function messageSubmitted() {
  return {
    type: MESSAGE_SUBMITTED,
    payload: {}
  }
}


export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function messageSubmit(message, user) {
  return function(dispatch) {

    // set 'loading' to true
    dispatch(messageSubmitted())

    return fetch('/api/messages',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: message,
          user: {
            id: user.data._id,
            name: user.data.name,
            avatarUrl: user.data.avatarUrl,
          }})
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }

        return rawResponse.json()
      }
    ).then(messageList => {

        return dispatch(messageListUpdate(messageList.activities))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}
