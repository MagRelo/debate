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
      <form className="pure-form pure-form-stacked" onSubmit={this.props.handleSubmit.bind(this)}>

        <fieldset>
          <p>Tokens Owned:
            <span className="currency-box">
              {this.props.ownedTokenCount}
            </span>
          </p>
          <p>Quantity to burn (you own {this.props.tokensOwned}):
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
            max={this.props.ownedTokenCount}
            onChange={this.handleChange.bind(this)}
          ></input>
        </fieldset>

        <button
          className="pure-button pure-button-primary"
          type="submit"> Burn
        </button>


      </form>

    )
  }
}

export default FormComponent
