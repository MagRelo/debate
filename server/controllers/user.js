var UserModel = require('../models/user')

exports.saveUser = (request, response)=>{
  return UserModel.update(
    {id: 1},
    {$set:{
      id: 1,
      name: 'richard',
    }},
    {upsert: true, new: true}
  ).then((mongoResponse)=>{
    return response.json(mongoResponse)
  }).catch((error)=>{
    return response.json(error)
  })

}
