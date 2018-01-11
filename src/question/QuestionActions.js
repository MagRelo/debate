
// ADD
export const QUESTION_SUBMITTED = 'QUESTION_SUBMITTED'
function questionSubmitted(question) {
  return {
    type: QUESTION_SUBMITTED,
    payload: question
  }
}

// LIST
export const QUESTION_LIST_UPDATE = 'QUESTION_LIST_UPDATE'
function questionListUpdate(questionList) {
  return {
    type: QUESTION_LIST_UPDATE,
    payload: questionList
  }
}

// DETAIL
export const REQUEST_QUESTION = 'REQUEST_QUESTION'
function requestQuestion() {
  return {
    type: REQUEST_QUESTION
  }
}
export const COMMENT_SUBMITTED = 'COMMENT_SUBMITTED'
function questionSubmitted(comment) {
  return {
    type: COMMENT_SUBMITTED,
    payload: comment
  }
}
export const QUESTION_UPDATED = 'QUESTION_UPDATED'
function questionUpdated() {
  return {
    type: QUESTION_RESPONSE
  }
}

export function questionSubmit(message, user) {
  return function(dispatch) {

    dispatch(questionSubmitted())

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
        dispatch(getMessagesByUser(user.data._id))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function commentSubmit(message, user) {
  return function(dispatch) {

    dispatch(questionSubmitted())

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
