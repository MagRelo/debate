import {sendEvent} from '../analytics/AnalyticsActions'
import { browserHistory } from 'react-router'


// set 'messages.loading' to true
export const REQUEST_SENT = 'REQUEST_SENT'
function requestSent() {
  return {
    type: REQUEST_SENT
  }
}

export const CONTRACT_UPDATE = 'CONTRACT_UPDATE'
function contractUpdated(contract) {
  return {
    type: CONTRACT_UPDATE,
    payload: contract
  }
}

export const LIST_UPDATE = 'LIST_UPDATE'
function listUpdated(list) {
  return {
    type: LIST_UPDATE,
    payload: list
  }
}

export function searchContracts(term) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    dispatch(sendEvent('search', {
      term: term
    }))

    return fetch('/api/contract/search',
      {
        method: "POST",
        body: {
          term: term
        }
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      }
    ).then(searchResults => {
        dispatch(listUpdated(searchResults))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

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

export function createContract(currentUser, contractOptions) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())
    dispatch(sendEvent('create',
      {
        'contractOptions': contractOptions
      }
    ))

    return fetch('/api/contract/create',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token
        },
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

        // send to profile
        return browserHistory.push('/contract/' + contract._id)
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function buyTokens(currentUser, targetId, tokensToPurchase, payment) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    // analytics
    dispatch(sendEvent('buy',
      {
        'targetId': targetId,
        'tokensToPurchase': tokensToPurchase,
        'payment': payment
      }
    ))


    return fetch('/api/contract/buy',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token
        },
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

export function sellTokens(currentUser, targetId, tokensToSell) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    // analytics
    dispatch(sendEvent('sell',
      {
        'targetId': targetId,
        'tokensToSell': tokensToSell
      }
    ))


    return fetch('/api/contract/sell',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token
        },
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

export function burnTokens(currentUser, targetContractId, tokensToBurn ) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    // analytics
    dispatch(sendEvent('burn',
      {
        'targetId': targetContractId,
        'tokensToBurn': tokensToBurn
      }
    ))


    return fetch('/api/contract/burn',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token
        },
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

export function drainEscrow(currentUser, targetId, drainAmount) {
  return function(dispatch) {

    // "loading"
    dispatch(requestSent())

    // analytics
    dispatch(sendEvent('drain',
      {
        'targetId': targetId,
        'drainAmount': drainAmount
      }
    ))


    return fetch('/api/contract/drain',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": currentUser.token
        },
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
