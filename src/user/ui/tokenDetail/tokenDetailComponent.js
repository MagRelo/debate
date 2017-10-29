import React, { Component } from 'react'
import { Link } from 'react-router'


import TokenPriceChart from '../tokenPriceChart/tokenPriceChartContainer'
import TokenFormContainer from '../tokenTransaction/FormContainer'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      tokenCount: 10,
      showForm: true
    }
  }

  render() {
    return(
      <main className="token-detail">

        <div className="pure-g">
          <div className="pure-u-1-1">

            <div className="compose-title-container">
              <span>{this.props.contractData.name}</span>
            </div>

            <div className="account-details">

              <TokenPriceChart data={this.props.contractData.tokenHistory}/>

              <p>Token Supply
                <span className="currency-box">
                  {this.props.contractData.tokenLedgerCount}
                </span>
              </p>
              <p>Escrow Balance
                <span className="currency-box">
                  ∯ {this.props.contractData.tokenLedgerEscrowBalance}
                </span>
              </p>
              <p>Current Buy Price
                <span className="currency-box">
                  ∯ {this.props.contractData.priceOfNextToken}
                </span>
              </p>
              <p>Current Sale Price
                <span className="currency-box">
                  ∯ {this.props.contractData.salePriceOfCurrentToken}
                </span>
              </p>
            </div>

            {this.state.showForm ?
              <TokenFormContainer
                targetId={this.props.contractData._id}
                priceOfNextToken={this.props.contractData.priceOfNextToken}
                ownedTokenCount={this.props.contractData.tokensOwned}
                salePriceOfCurrentToken={this.props.contractData.salePriceOfCurrentToken}
                closeModalFunction={this.props.closeModalFunction}
                />
              : null
            }



          </div>
        </div>
      </main>
    )
  }
}

export default FormComponent
