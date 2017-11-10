
// set 'messages.loading' to true
export const ANALYTICS_EVENT = 'ANALYTICS_EVENT'
function requestSent() {
  return {
    type: ANALYTICS_EVENT
  }
}

export function sendEvent(type, eventData) {

  return function(dispatch) {

    return fetch('/api/analytics/send',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: type,
          data: eventData
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(searchResults => {
        console.log('event sent')
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}
