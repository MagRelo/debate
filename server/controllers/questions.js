const fetch = require('request-promise')
const config = require('../config/environment')

const handler = require('./errors')

const questionModel = require('../models/question')

exports.saveQuestion = (request, response) => {

  // validade client request data
  // return handler.handleError(request.body, request, response)

  const question = new questionModel(request.body)

  question.save()
    .then(result =>{ response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })
}

exports.getQuestion = (request, response) => {

  questionModel.find({_id: request.params.questionId })
    .then((result)=>{ response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })

}

exports.saveComment = (request, response) => {

  // validade client request data
  // return handler.handleError(request.body, request, response)

  questionModel.update(
      {_id: request.params.questionId },
      {$push: {comments: request.body}}
    )
    .then((result)=>{response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })

}

exports.saveVote = (request, response) => {

  // validade client request data
  // return handler.handleError(request.body, request, response)

  questionModel.update(
      {_id: request.params.questionId },
      {$push: {votes: request.body}}
    )
    .then((result)=>{response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })

}
