const fetch = require('request-promise')
const config = require('../config/environment')

exports.sendEvent = (request, response) => {

  fetch({
      method: 'POST',
      url: 'http://' + config.elasticSearch_HOST + ':' + config.elasticSearch_PORT + '/analytics/event',
      json: true,
      body: {
        'eventType': request.body.eventType,
        'data': request.body.data,
        'timestamp': new Date()
      }
    })
    .then((result)=>{

      response.send(result);

    }).catch((error) => {

      // client error
      if(error.clientError){
        console.error(error.message)
        return response.status(error.status).json(error);
      }

      // server error
      console.error(error.message)
      return response.status(500).json({error: error.message});

    })

}
