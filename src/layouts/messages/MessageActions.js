
// set 'messages.loading' to true
export const MESSAGE_SUBMITTED = 'MESSAGE_SUBMITTED'
function messageSubmitted() {
  return {
    type: MESSAGE_SUBMITTED,
    payload: {}
  }
}

// update messages list
export const MESSAGE_LIST_UPDATE = 'MESSAGE_LIST_UPDATE'
function messageListUpdate(messageList) {
  return {
    type: MESSAGE_LIST_UPDATE,
    payload: messageList
  }
}

export function messageSubmit(message, user) {
  return function(dispatch) {

    // set 'messages.loading' to true
    dispatch(messageSubmitted())

    return fetch('/api/messages',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: message,
          user: {
            id: user.data._id
          }})
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(messageList => {

        // update messages list
        return dispatch(messageListUpdate(messageList.activities))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}


export function getMessages(userId, message) {
  return function(dispatch) {
    return fetch('/api/messages/' + userId,
      {
        method: "GET"
      }
    ).then(rawResponse => {

        if(rawResponse.status !== 200){
          throw new Error(rawResponse.text)
        }

        return rawResponse.json()
      }
    ).then(userObject => {

        return dispatch(messageListUpdate(userObject.activities))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}
