import React from 'react'

// Images
import uPortLogo from '../../../img/uport-logo.svg'

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <a href="#"
      className="pure-button"
      onClick={(event) => onLoginUserClick(event)}>Login
    </a>
  )
}

export default LoginButton
