import React from 'react'

import TwitterLogin from 'react-twitter-auth'

// Images
import uPortLogo from '../../../img/uport-logo.svg'

const LoginButton = ({ loginSuccess }) => {


  function onSuccess(response) {
    response.json().then(body => {
      loginSuccess(body)
    });
  }

  function onFailed(error) {
    alert(error);
  }

  return(
    <TwitterLogin
      requestTokenUrl="http://cbc7ab00.ngrok.io/api/v1/auth/twitter/reverse"
      loginUrl="http://cbc7ab00.ngrok.io/auth/twitter"
      onFailure={onFailed}
      onSuccess={onSuccess}
    />
  )
}

export default LoginButton
