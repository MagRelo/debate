const fetch = require('request-promise')
const config = require('../config/environment')

exports.handleError = (error, request, response) => {

  let errorDefault = {
    status: 500,
    message: 'internal server error',
  }

  let merged = Object.assign({}, errorDefault, error)

  console.error(merged.message)
  return response.status(merged.status).json({error: merged.message});

}
