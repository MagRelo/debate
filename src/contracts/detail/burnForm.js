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


  handleSubmit(event){
    event.preventDefault()
    return this.props.burnTokenFunction(this.state.tokenCount)
  }


  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

        <fieldset>
          <p>Tokens Owned:
            <span className="currency-box">
              {this.props.ownedTokenCount}
            </span>
          </p>
          <p>Quantity to burn:
            <span className="currency-box">
              {this.state.tokenCount}
            </span>
          </p>
        </fieldset>

        <fieldset>
          <input
            id="id"
            type="range"
            value={this.state.tokenCount}
            min="0"
            max={this.props.tokenLedgerCount}
            onChange={this.handleChange.bind(this)}
          ></input>
        </fieldset>

        <button
          disabled={!this.props.loggedIn || this.state.tokenCount > 0}
          className="pure-button pure-button-primary"
          type="submit"> Burn
        </button>


      </form>

    )
  }
}

export default FormComponent
