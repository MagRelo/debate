import React, { Component } from 'react'
import { Link } from 'react-router'
import Editor from './editor'


class ComposeMessage extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      text: 'Lorem Ipsum MGL'
    }
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <h1>Compose Message</h1>

            <Editor/>


          </div>
        </div>
      </main>
    )
  }
}

export default ComposeMessage
