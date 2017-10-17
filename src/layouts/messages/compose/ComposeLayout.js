import React, { Component } from 'react'
import { Link } from 'react-router'
import Editor from 'react-medium-editor';

class ComposeMessage extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  handleChange(text) {
    this.setState({text: text})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onMessageSubmit(this.state.text, this.props.user)
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

            {this.props.messages.loading ?

              <div>
                <div className="loader"></div>
              </div>

            :

              <form className="pure-form pure-form-stacked " onSubmit={this.handleSubmit.bind(this)}>
                <Editor
                  className="editor-input"
                  text=""
                  onChange={this.handleChange.bind(this)}/>
                <button
                  type="submit"
                  className="pure-button pure-button-primary" > Submit </button>
              </form>

            }

            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default ComposeMessage
