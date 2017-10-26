import React, {Component} from 'react'
import { Link } from 'react-router'

import Logo from '../../img/circle.svg'

import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import SignUpFormContainer from '../../user/ui/signup/SignUpFormContainer'
import SelectUserContainer from '../../user/ui/selectUser/SelectUserContainer'

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-3"></div>
          <div className="pure-u-1 pure-u-md-1-3">

            <h1>Legible</h1>

            <SignUpFormContainer/>

            <SelectUserContainer/>

          </div>
        </div>
      </main>
    )
  }
}

export default Home
