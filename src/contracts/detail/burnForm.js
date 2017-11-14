import React, { Component } from 'react'
import { Link } from 'react-router'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      tokenCount: 0
    }
  }

  handleChange(event) {
    this.setState({
      tokenCount: event.target.value
    })
  }

  render() {

    return(
      <table className="pure-table">
        <thead>
          <tr>
            <td>user</td>
            <td>tokens</td>
            <td>collect</td>
          </tr>
        </thead>
        <tbody>
          {this.props.tokenLedger.map(tokenHolder =>{
            return <tr key={tokenHolder.user._id}>
                <td>{tokenHolder.user.name}</td>
                <td>{tokenHolder.tokenCount}</td>
                <td>
                  <button
                    className="pure-button pure-button-primary"
                    onClick={()=>{this.props.burnTokenFunction(tokenHolder.user._id, tokenHolder.tokenCount)}}>collect
                  </button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

    )
  }
}

export default FormComponent
