var UserModel = require('../models/user')
const uuidv1 = require('uuid/v1');


exports.saveUser = (request, response) => {

  const userName = request.body.name || 'default name'
  const avatarUrl = request.body.avatarUrl || 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'

  const user = new UserModel({
    name: userName,
    avatarUrl: avatarUrl,
    timestamp: new Date()
  })

  return user.save()
    .then((mongoResponse)=>{
      return response.json(mongoResponse)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.getUser = (request, response) => {

  return UserModel.findOne({id: 1}).lean()
    .then((userData)=>{
      return response.json(userData)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.saveMessage = (request, response) => {

  return UserModel.update(
    {id: 1},
    {$push: {'messages': {
      id: uuidv1(),
      timestamp: new Date(),
      message: request.body
    }}},
    {upsert: true, new: true}
  ).then((mongoSaveResponse)=>{
    return UserModel.findOne({id: 1}).lean()
  }).then((userData)=>{
    return response.json(userData)
  }).catch((error)=>{
    return response.json(error)
  })

}
