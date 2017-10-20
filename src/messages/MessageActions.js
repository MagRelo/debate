
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

export const TIMELINE_LIST_UPDATE = 'TIMELINE_LIST_UPDATE'
function timelineListUpdate(timelineList) {
  return {
    type: TIMELINE_LIST_UPDATE,
    payload: timelineList
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

        dispatch(getTimelineByUser(user.data._id))
        dispatch(getMessagesByUser(user.data._id))
        
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}


export function getMessagesByUser(userId) {
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

export function getTimelineByUser(userId) {
  return function(dispatch) {
    return fetch('/api/timeline/' + userId,
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

        return dispatch(timelineListUpdate(userObject.activities))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}
