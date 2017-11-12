import React from 'react'

import TwitterLogin from 'react-twitter-auth'


const LoginButton = ({ loginSuccess }) => {

  function onSuccess(response) {
    response.json().then(body => {
      body.user.token = body.token
      loginSuccess(body.user)
    });
  }

  function onFailed(error) {
    alert(error);
  }

  return(
    <TwitterLogin
      text="Login"
      style={{backgroundColor: 'inherit', border: 'none'}}
      requestTokenUrl="/api/v1/auth/twitter/reverse"
      loginUrl="/auth/twitter"
      onFailure={onFailed}
      onSuccess={onSuccess}
    />
  )
}

export default LoginButton
