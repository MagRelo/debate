import React, { Component } from 'react'
import { Link } from 'react-router'
import Editor from './editor'


class ComposeMessage extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="compose-container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <div className="compose-title-container">
              <span className="title">Compose Message</span>
            </div>

            <div className="compose-editor-container">
              <Editor
                loading={this.props.messages.loading}
                submitFunction={this.props.onMessageSubmit} />
            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default ComposeMessage
