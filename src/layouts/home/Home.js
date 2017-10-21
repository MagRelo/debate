import React, {Component} from 'react'
import { Link } from 'react-router'

import Logo from '../../img/circle.svg'

import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import SignUpFormContainer from '../../user/ui/signup/SignUpFormContainer'
import SelectUserContainer from '../../user/ui/selectUser/SelectUserContainer'

//
//
// <h1>Servésa</h1>
// <h3> Trust Networks</h3>
// <img className="logo" src={Logo}></img>
//
// <h3>Make your existing networks legible and actionable</h3>
// <h3>Explore new opportunies with people that you trust</h3>
// <h3>Prevent spam and advertising</h3>
//
// <LoginButtonContainer />
//

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <h1>Servésa</h1>

            <SelectUserContainer/>
            
            <SignUpFormContainer/>

          </div>
        </div>
      </main>
    )
  }
}

export default Home
