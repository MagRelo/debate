


export const MESSAGE_LIST_UPDATE = 'MESSAGE_LIST_UPDATE'
function messageListUpdate(messageList) {
  return {
    type: MESSAGE_LIST_UPDATE,
    payload: messageList
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
