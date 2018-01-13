
import { browserHistory } from 'react-router'

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

// ADD
export const QUESTION_SUBMITTED = 'QUESTION_SUBMITTED'
function questionSubmitted(question) {
  return {
    type: QUESTION_SUBMITTED,
    payload: question
  }
}
export const COMMENT_SUBMITTED = 'COMMENT_SUBMITTED'
function commentSubmitted(comment) {
  return {
    type: COMMENT_SUBMITTED,
    payload: comment
  }
}
export const VOTE_SUBMITTED = 'VOTE_SUBMITTED'
function voteSubmitted(vote) {
  return {
    type: VOTE_SUBMITTED,
    payload: vote
  }
}

export const QUESTION_UPDATED = 'QUESTION_UPDATED'
function questionUpdated(questionData) {
  return {
    type: QUESTION_UPDATED,
    payload: questionData
  }
}


export function listQuestions() {
  return function(dispatch) {
    return fetch('/api/question', {method: "GET"})
      .then(rawResponse => {
        if(rawResponse.status !== 200){
          throw new Error(rawResponse.text)
        }
        return rawResponse.json()
      }
    ).then(questions => {
        return dispatch(questionListUpdate(questions))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function getQuestion(id) {
  return function(dispatch) {
    return fetch('/api/question/' + id, {method: "GET"})
      .then(rawResponse => {
        if(rawResponse.status !== 200){
          throw new Error(rawResponse.text)
        }
        return rawResponse.json()
      }
    ).then(questionData => {
        return dispatch(questionUpdated(questionData))
      }
    ).catch(error => {
      console.error('action error', error)
      return
    })

  }
}

export function addQuestion(question, user) {
  return function(dispatch) {

    dispatch(questionSubmitted(question))

    return fetch('/api/question',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question)
      })
      .then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      })
      .then(questionData => {
        dispatch(questionUpdated(questionData))

        // send to question
        return browserHistory.push('/questions/' + questionData._id)
      })
      .catch(error => {
        console.error('action error', error)
        return
      })

  }
}
export function commentSubmit(comment, questionId, user) {
  return function(dispatch) {

    dispatch(commentSubmitted())

    return fetch('/api/comment/' + questionId,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: comment,
          user: user
      })
    })
    .then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
    })
    .then(questionData => {
        dispatch(questionUpdated(questionData))
    })
    .catch(error => {
      console.error('action error', error)
      return
    })

  }
}
export function voteSubmit(vote, selectedComments, questionId, user) {
  return function(dispatch) {

    dispatch(voteSubmitted())

    return fetch('/api/vote/' + questionId,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vote: vote,
          selectedComments: selectedComments,
          user: user
        })
      }
    ).then(rawResponse => {
        if(rawResponse.status !== 200){ throw new Error(rawResponse.text) }
        return rawResponse.json()
      })
      .then(questionData => {
          dispatch(questionUpdated(questionData))
      })
      .catch(error => {
      console.error('action error', error)
      return
    })

  }
}
