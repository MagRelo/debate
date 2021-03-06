import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// Fonts
import './css/open-sans.css'
import './css/michroma.css'
import './css/barlow.css'

import './css/pure-min.css'
import './css/grids-responsive-min.css'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

import './App.css'

import userIcon from './img/User_font_awesome.svg'


// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'


class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/profile" activeStyle={{ color: '#FF5934' }} className="pure-menu-link">
            <img className="profile-menu-link" src={userIcon}></img>
          </Link>
        </li>
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <LoginButtonContainer/>
        </li>
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">

          <div className="logo-holder">
            <div className="logo">
              <div style={{'backgroundColor': '#ff5935', height: '8px'}}></div>
              <div style={{'backgroundColor': 'white', height: '6px'}}></div>
              <div style={{'backgroundColor': '#17799d', height: '9px'}}></div>
            </div>
          </div>

          <Link to="/" className="pure-menu-heading pure-menu-link">
            Servésa</Link>
          <ul className="pure-menu-list navbar-right">
            <li className="pure-menu-item">
              <Link to="/questions/list" activeStyle={{ color: '#FF5934' }} className="pure-menu-link">Questions</Link>
            </li>
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-6"></div>
            <div className="pure-u-1 pure-u-md-2-3">
              <div style={{marginTop: '1em'}}>

                {this.props.children}

              </div>

            </div>
          </div>
        </main>


      </div>
    );
  }
}

export default App
