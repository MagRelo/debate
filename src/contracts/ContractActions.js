
// set 'messages.loading' to true
export const CONTRACT_UPDATE = 'CONTRACT_UPDATE'
function contractUpdated(contract) {
  return {
    type: CONTRACT_UPDATE,
    payload: contract
  }
}

export const REQUEST_SENT = 'REQUEST_SENT'
function requestSent() {
  return {
    type: REQUEST_SENT
  }
}

export const LIST_UPDATE = 'LIST_UPDATE'
function listUpdated(list) {
  return {
    type: LIST_UPDATE,
    payload: list
  }
}


export function listContracts() {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    return fetch('/api/contract/list',
      {
        method: "GET"
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(list => {
        dispatch(listUpdated(list))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function getContract(contractId) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    return fetch('/api/contract/' + contractId,
      {
        method: "GET"
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(contract => {
        dispatch(contractUpdated(contract))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function createContract(contractOptions) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    return fetch('/api/contract/create',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractOptions: contractOptions
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(contract => {
        dispatch(contractUpdated(contract))
        dispatch(listContracts())
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function buyTokens(targetId, tokensToPurchase, payment) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    return fetch('/api/contract/buy',
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: targetId,
          tokensToPurchase: tokensToPurchase,
          payment: payment
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(contract => {

        dispatch(contractUpdated(contract))

      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function sellTokens(targetId, tokensToSell) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    const targetId = '59f8b84b86a4e6853976ef60'
    const tokensToSell = 10

    return fetch('/api/contract/sell',
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: targetId,
          tokensToSell: tokensToSell
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(contract => {

        dispatch(contractUpdated(contract))

      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function burnTokens(targetContractId, tokensToBurn ) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    const targetContractId = '59f8b84b86a4e6853976ef60'
    const tokensToBurn = 5

    return fetch('/api/contract/burn',
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetContractId: targetContractId,
          tokensToBurn: tokensToBurn
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(contract => {

        dispatch(contractUpdated(contract))

      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function drainEscrow(targetId, drainAmount) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    const targetId = '59f8b84b86a4e6853976ef60'
    const drainAmount = 50

    return fetch('/api/contract/drain',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: targetId,
          drainAmount: drainAmount
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(contract => {

        dispatch(contractUpdated(contract))

      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}
