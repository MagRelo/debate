import React, { Component } from 'react'
import { Link } from 'react-router'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      tokenCount: 10,
      purchasePrice: Math.round(10 * this.props.tokenBuyPrice)
    }
  }


  handleSubmit(event){
    event.preventDefault()

    // get token count
    return this.props.buyTokenFunction(parseInt(this.state.tokenCount, 10), this.state.purchasePrice)
  }

  handleChange(event) {
    this.setState({
      tokenCount: event.target.value,
      purchasePrice: Math.round(event.target.value * this.props.tokenBuyPrice)
    })
  }

  calcMaxBuy(availableBalance, costOfNextToken) {
    return Math.round(Math.floor(availableBalance/costOfNextToken)).toString()
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

        <fieldset>
          <p>Next Token Price:
            <span className="currency-box">
              ∯ {this.props.tokenBuyPrice || '***'}
            </span>
          </p>
          <p>Quantity to purchase:
            <span className="currency-box">
              {this.state.tokenCount}
            </span>
          </p>
          <input
            id="id"
            type="range"
            value={this.state.tokenCount}
            min="0"
            max={this.calcMaxBuy(this.props.availableBalance, this.props.tokenBuyPrice)}
            onChange={this.handleChange.bind(this)}
          ></input>
        </fieldset>

        <p className="purchase-total">Total Purchase Price:
          <span className="currency-box">
            ∯ {this.state.purchasePrice}
          </span>
        </p>

        <button
          disabled={!this.props.loggedIn || this.state.tokenCount <= 0}
          className="pure-button pure-button-primary"
          type="submit"> Buy
        </button>

      </form>
    )
  }
}

export default FormComponent
