import React, { Component } from 'react'
import { Link } from 'react-router'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      formOpen: false,
      buying: true,
      tokenCount: 0,
      purchasePrice: 0,
      sellPrice: 0
    }
  }

  handleChange(event) {
    this.setState({
      tokenCount: event.target.value,
      purchasePrice: Math.round(event.target.value * this.props.priceOfNextToken),
      sellPrice: Math.round(event.target.value * this.props.salePriceOfCurrentToken)
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if(this.state.buying){
      // buying tokens
      this.props.followUserClick(event, this.props.userId, this.props.targetId, parseInt(this.state.tokenCount, 10))

      return this.props.closeModalFunction()
    }

    if(!this.state.buying){
      // selling tokens
      this.props.unFollowUserClick(event, this.props.userId, this.props.targetId, parseInt(this.state.tokenCount, 10))

      return this.props.closeModalFunction()
    }

    if(false){
      // burning tokens
      this.props.unFollowUserClick(event, this.props.userId, this.props.targetId, parseInt(this.state.tokenCount, 10))

      return this.props.closeModalFunction()
    }


  }

  calcMaxBuy(availableBalance, costOfNextToken) {
    return Math.round(Math.floor(availableBalance/costOfNextToken)).toString()
  }

  closeForm(event) {
    event.preventDefault()
    this.setState({ formOpen: false, buying: true })
  }

  openBuy(event) {
    event.preventDefault()
    this.setState({ formOpen: true, buying: true })
  }

  openSell(event) {
    event.preventDefault()
    this.setState({ formOpen: true, buying: false })
  }

  render() {
    return(
      <main className="compose-container">
            <div className="compose-title-container">
              <span className="title">Token Transaction</span>
              <span className="title">
                <button className="pure-button pure-button-primary title-button" onClick={this.openBuy.bind(this)}> Buy </button>
                <button className="pure-button pure-button-primary title-button" onClick={this.openSell.bind(this)}> Sell </button>
              </span>
            </div>

            <div className="compose-editor-container">

            {this.state.formOpen && this.state.buying ?

              <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

                <fieldset>
                  <p>Available Balance:
                    <span className="currency-box">
                      ∯ {this.props.availableBalance || '***'}
                    </span>
                  </p>
                  <p>Next Token Price:
                    <span className="currency-box">
                      ∯ {this.props.priceOfNextToken || '***'}
                    </span>
                  </p>
                  <p>Quantity to purchase:
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
                    max={this.calcMaxBuy(this.props.availableBalance, this.props.priceOfNextToken)}
                    onChange={this.handleChange.bind(this)}
                  ></input>
                </fieldset>

                <fieldset>
                  <p className="purchase-total">Total Purchase Price:
                    <span className="currency-box">
                      ∯ {this.state.purchasePrice}
                    </span>
                  </p>
                </fieldset>

                <button
                  className="pure-button pure-button-primary"
                  type="submit"> Buy
                </button>
                <button
                  className="pure-button"
                  onClick={this.closeForm.bind(this)}
                  type="button"> Cancel
                </button>

              </form>

              : null
            }

            {this.state.formOpen && !this.state.buying ?

              <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

                <fieldset>
                  <p>Tokens Owned:
                    <span className="currency-box">
                      {this.props.ownedTokenCount}
                    </span>
                  </p>
                  <p>Token Sell Price:
                    <span className="currency-box">
                      ∯ {this.props.salePriceOfCurrentToken}
                    </span>
                  </p>
                  <p>Quantity to sell:
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

                <fieldset>
                  <p className="purchase-total">Total Sell Price:
                    <span className="currency-box">
                      ∯ {this.state.sellPrice}
                    </span>
                  </p>
                </fieldset>

                <button
                  className="pure-button pure-button-primary"
                  type="submit"> Sell
                </button>
                <button
                  className="pure-button"
                  onClick={this.closeForm.bind(this)}
                  type="button"> Cancel
                </button>


              </form>

              : null
            }

            </div>

      </main>
    )
  }
}

export default FormComponent
