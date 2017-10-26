import React, { Component } from 'react'
import { Link } from 'react-router'


import TokenPriceChart from '../tokenPriceChart/tokenPriceChartContainer'
import TokenFormContainer from '../tokenTransaction/FormContainer'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      tokenCount: 10
    }
  }

  // handleChange(event) {
  //   this.setState({tokenCount: event.target.value})
  // }
  //
  // handleSubmit(event) {
  //   event.preventDefault()
  //
  //   this.props.followUserClick(event, this.props.userId, this.props.targetId, parseInt(this.state.tokenCount, 10))
  //   // unFollowUserClick(event, userId, targetId, 7)
  //
  // }

  render() {
    return(
      <main className="token-detail">

        <div className="pure-g">
          <div className="pure-u-1-1">


            <TokenPriceChart data={this.props.contractData.tokenHistory}/>


            <div className="account-details">
              <p><strong>Token Supply</strong>
                <span className="currency-box">
                  {this.props.contractData.tokenLedgerCount}
                </span>
              </p>
              <p><strong>Escrow Balance</strong>
                <span className="currency-box">
                  ∯ {this.props.contractData.tokenLedgerEscrowBalance}
                </span>
              </p>
              <p><strong>Current Buy Price</strong>
                <span className="currency-box">
                  ∯ {this.props.contractData.priceOfNextToken}
                </span>
              </p>
              <p><strong>Current Sale Price</strong>
                <span className="currency-box">
                  ∯ {this.props.contractData.salePriceOfCurrentToken}
                </span>
              </p>
            </div>

            <TokenFormContainer userId={this.props.contractData._id} targetId={this.props.contractData}/>


          </div>
        </div>
      </main>
    )
  }
}

export default FormComponent
