


export const MESSAGE_SUBMIT = 'MESSAGE_SUBMITTED'
function submitMessage(message) {
  return {
    type: MESSAGE_SUBMIT,
    payload: message
  }
}

//
export function messageSubmit(message) {
  return function(dispatch) {
    console.log(message)
    alert(message)
    dispatch(submitMessage(message))
    return
  }
}
