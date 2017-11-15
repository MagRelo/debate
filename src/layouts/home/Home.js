import React, {Component} from 'react'
import { Link } from 'react-router'

import Logo from '../../img/circle.svg'

import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'

// import ContractList from '../../contracts/list/contractListContainer'

import SelectUser from '../../user/ui/selectUser/SelectUserContainer'
import circleImage from "../../img/circle.png"


class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-3"></div>
          <div className="pure-u-1 pure-u-md-1-3">
          </div>
        </div>
      </main>
    )
  }
}

export default Home
