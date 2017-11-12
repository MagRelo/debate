import React, { Component } from 'react'
import { Link } from 'react-router'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      tokenCount: 0,
      sellPrice: 0
    }
  }

  handleSubmit(event){
    event.preventDefault()
    return this.props.sellTokenFunction(this.state.tokenCount)
  }


  handleChange(event) {
    this.setState({
      tokenCount: event.target.value,
      sellPrice: Math.round(event.target.value * this.props.tokenSellPrice)
    })
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

        <fieldset>
          <p>Token Sell Price:
            <span className="currency-box">
              ∯ {this.props.tokenSellPrice}
            </span>
          </p>
          <p>Quantity to sell (you own {this.props.ownedTokenCount}):
            <span className="currency-box">
              {this.state.tokenCount}
            </span>
          </p>
          <input
            id="id"
            type="range"
            value={this.state.tokenCount}
            min="0"
            max={this.props.ownedTokenCount}
            onChange={this.handleChange.bind(this)}
          ></input>
        </fieldset>

        <p className="purchase-total">Total Sell Price:
          <span className="currency-box">
            ∯ {this.state.sellPrice}
          </span>
        </p>

        <button
          disabled={!this.props.loggedIn || this.state.tokenCount <= 0}
          className="pure-button pure-button-primary"
          type="submit"> Sell
        </button>


      </form>

    )
  }
}

export default FormComponent
