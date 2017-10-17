var UserModel = require('../models/user')
const uuidv1 = require('uuid/v1');

exports.listUsers = (request, response) => {

  return UserModel.find({}).lean()
    .then((userData)=>{
      return response.json(userData)
    }).catch((error)=>{
      return response.json(error)
    })


}

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

  const userName = request.params.name || 'default name'

  return UserModel.findOne({name: userName}).lean()
    .then((userData)=>{
      return response.json(userData)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.saveMessage = (request, response) => {

  const userId = request.body.user.id || '0'

  return UserModel.update(
    {_id: userId},
    {$push: {'messages': {
      id: uuidv1(),
      timestamp: new Date(),
      message: request.body
    }}},
    {upsert: true, new: true}
  ).then((mongoSaveResponse)=>{
    return UserModel.findOne({_id: userId}).lean()
  }).then((userData)=>{
    return response.json(userData)
  }).catch((error)=>{
    return response.json(error)
  })

}
