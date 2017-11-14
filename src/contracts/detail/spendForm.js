import React, { Component } from 'react'
import { Link } from 'react-router'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      spendAmount: 0
    }
  }

  handleSubmit(event){
    event.preventDefault()
    return this.props.spendEscrowFunction(this.state.spendAmount)
  }


  handleChange(event) {
    this.setState({
      spendAmount: event.target.value
    })
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

        <fieldset>
          <p>Contract Escrow Balance:
            <span className="currency-box">
              ∯ {this.props.contractEscrowBalance}
            </span>
          </p>
          <p>Amount to spend:
            <span className="currency-box">
              {this.state.spendAmount}
            </span>
          </p>
          <input
            className
            type="number"
            value={this.state.spendAmount}
            min="0"
            max={this.props.contractEscrowBalance}
            onChange={this.handleChange.bind(this)}
          ></input>
        </fieldset>

        <p className="purchase-total">Total Spend Amount:
          <span className="currency-box">
            ∯ {this.state.spendAmount}
          </span>
        </p>

        <button
          disabled={!this.props.loggedIn || this.state.spendAmount <= 0}
          className="pure-button pure-button-primary"
          type="submit"> Spend
        </button>


      </form>

    )
  }
}

export default FormComponent
