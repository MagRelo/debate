import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import TokenPriceChart from './tokenPriceChart'

// Forms
import BuyForm from './buyForm'
import SellForm from './sellForm'
import BurnForm from './burnForm'


class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      showForm: true
    }
  }

  buyTokens(tokenCount, purchasePrice){
    this.props.buyTokens(this.props.contractData._id, tokenCount, purchasePrice)
    if(this.props.closeModalFunction) return this.props.closeModalFunction()
  }

  sellTokens(tokenCount){
    this.props.sellTokens(this.props.contractData._id, tokenCount)
    if(this.props.closeModalFunction) return this.props.closeModalFunction()
  }

  burnTokens(tokenCount){
    this.props.burnTokens(this.props.contractData._id, tokenCount)
    if(this.props.closeModalFunction) return this.props.closeModalFunction()
  }


  render() {
    return(
      <main className="token-detail">

        <div className="pure-g">
          <div className="pure-u-1-1">

            <div className="compose-title-container">
              <div className="icon-holder">
                <div
                  className="icon"
                  style={{'backgroundImage': 'url(\'' + this.props.contractData.contractOptions.avatarUrl + '\')'}}>
                </div>
              </div>

              <div className="text-holder">
                <div className="feed-title">{this.props.contractData.contractOptions.name}</div>
              </div>
            </div>

            <div className="contractOptions">
              <div>
                <div>{this.props.contractData.contractOptions.exponent}</div>
                <div>buy</div>
              </div>
              <div>
                <div>{this.props.contractData.contractOptions.exponent}</div>
                <div>sell</div>
              </div>
              <div>
                <div>{this.props.contractData.contractOptions.ownerCanBurn ? '✔' : '✘'}</div>
                <div>burn</div>
              </div>
              <div>
                <div>{this.props.contractData.contractOptions.ownerCanDrain ? '✔' : '✘'}</div>
                <div>drain</div>
              </div>
            </div>

            <div className="account-details">

              <p>Token Supply
                <span className="currency-box">
                  {this.props.contractData.tokenLedgerCount}
                </span>
              </p>
              <p>Escrow Balance
                <span className="currency-box">
                  ∯ {this.props.contractData.contractEscrowBalance}
                </span>
              </p>
              <p>Current Buy / Sell
                <span className="currency-box">
                  ∯ {this.props.contractData.tokenBuyPrice}
                  &nbsp; / &nbsp;
                  ∯ {this.props.contractData.tokenSellPrice}
                </span>
              </p>

            </div>

            <section style={{height: '320px'}}>
              <Tabs>

                <TabList>
                  <Tab>History</Tab>
                  <Tab>Pledge</Tab>
                  <Tab disabled={!this.props.tokensOwned || this.props.tokensOwned < 1}> Withdraw </Tab>
                  <Tab disabled={!this.props.tokenHolderList}> Collect </Tab>
                  <Tab disabled={!this.props.tokenHolderList}> Spend </Tab>
                </TabList>

                <TabPanel>
                  <TokenPriceChart data={this.props.contractData.tokenHistory}/>
                </TabPanel>


                <TabPanel>

                  <BuyForm
                    buyTokenFunction={this.buyTokens.bind(this)}
                    tokenBuyPrice={this.props.contractData.tokenBuyPrice}
                    availableBalance={this.props.availableBalance}/>

                </TabPanel>
                <TabPanel>

                  <SellForm
                    sellTokenFunction={this.sellTokens.bind(this)}
                    tokenSellPrice={this.props.contractData.tokenSellPrice}
                    ownedTokenCount={this.props.tokensOwned}/>

                </TabPanel>
                <TabPanel>

                </TabPanel>
                <TabPanel>

                </TabPanel>
              </Tabs>

            </section>



          </div>
        </div>
      </main>
    )
  }
}


export default FormComponent
