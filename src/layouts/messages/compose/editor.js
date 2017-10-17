import React, { Component } from 'react'
import Editor from 'react-medium-editor';


class MessageEditor extends Component {
  constructor(props, {onMessageSubmit}) {
    super(props)
    this.state = {
      text: '',
      displayResponse: false
    }
  }

  handleChange(text) {
    this.setState({text: text})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitFunction(this.state.text)
  }

  render(){
    return (
      <div>

        {this.props.loading ?

        <div>
          <div className="loader"></div>

          {this.state.displayResponse ?

            <p>result: {this.state.result}</p>
            :
            null
          }

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

    )
  }

}

export default MessageEditor
