const fetch = require('request-promise')
const config = require('../config/environment')

const handler = require('./errors')

const questionModel = require('../models/question')
const commentModel = require('../models/comment')

exports.saveQuestion = (request, response) => {

  // validade client request data
  // return handler.handleError(request.body, request, response)

  const question = new questionModel(request.body)

  question.save()
    .then(result => {
      return questionModel.findOne({_id: result._id}, {votes: 0}).populate('comments')
    })
    .then(result =>{ response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })
}

exports.getAllQuestions = (request, response) => {

  questionModel.find({}, {votes: 0}).populate('comments')
    .then((result)=>{ response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })

}

exports.getQuestion = (request, response) => {

  // validate that this is valid or it will error on casting
  const questionId = request.params.questionId

  questionModel.findOne({_id: questionId}, {votes: 0}).populate('comments')
    .then((result)=>{ response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })

}


exports.saveComment = (request, response) => {

  // validade client request data
  // return handler.handleError(request.body, request, response)

  const comment = new commentModel(request.body)

  comment.save()
    .then(()=>{
      return questionModel.update(
          {_id: request.params.questionId },
          {$push: {comments: comment}}
        )
    })
    .then(result => {
      return questionModel.findOne({_id: request.params.questionId}, {votes: 0}).populate('comments')
    })
    .then((result)=>{response.send(result)})
    .catch(error =>{
      return handler.handleError(error, request, response)
    })

}

exports.saveVote = (request, response) => {

  // validade client request data
  // return handler.handleError(request.body, request, response)

  const vote = request.body.vote
  const user = request.user

  questionModel.update(
      {_id: request.params.questionId },
      {$push: {'votes': {'vote': vote, 'user': user}}}
    )
    .then(result => {
      return questionModel.findOne({_id: request.params.questionId}, {votes: 0}).populate('comments')
    })
    .then((result)=>{response.send(result); })
    .catch(error =>{
      return handler.handleError(error, request, response)
    })

}
