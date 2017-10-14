import React, { Component } from 'react'
import Editor from 'react-medium-editor';

import request from 'request-promise'


class MessageEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Lorem Ipsum MGL',
      result: '',
      sending: false,
      sendSuccess: false
    }
  }

  handleChange(text) {
    this.setState({text: text})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({sending: true})

    console.log('submitting')

    request('http://ip.jsontest.com/')
      .then(response => {
        this.setState({
          result: response,
          sending: false,
          sendSuccess: true
        })

        setTimeout(()=>{
          this.setState({
            text: 'Lorem Ipsum MGL',
            result: '',
            sending: false,
            sendSuccess: false
          })
        }, 3000)

      })
      .catch(error => {
        alert(error)
      })
  }

  reset(event) {
    event.preventDefault()
    this.setState({
      'result': '',
      'sendSuccess': false
    })
  }

  render(){
    return (
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

        {this.state.sending ?
        <div className="loader"></div>
        :

        <div>
          {this.state.sendSuccess ?
          <div>
            <p>success:{this.state.result}</p>
          </div>
          :

          <div>
            <Editor
              tag="pre"
              text=""
              onChange={this.handleChange.bind(this)}
              options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
            />
            <button type="submit"
              className="pure-button pure-button-primary" > Submit </button>
          </div>
          }

        </div>
        }

      </form>
    )
  }

}

export default MessageEditor
