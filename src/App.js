import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/grids-responsive-min.css'

import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

import './App.css'


class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/feed" activeStyle={{ color: '#FF5934' }} className="pure-menu-link">Feed</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" activeStyle={{ color: '#FF5934' }} className="pure-menu-link">Profile</Link>
        </li>
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
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
            <OnlyGuestLinks />
            <OnlyAuthLinks />
            <li className="pure-menu-item">
              <Link to="/contracts" activeStyle={{ color: '#FF5934' }} className="pure-menu-link">Contracts</Link>
            </li>
          </ul>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
