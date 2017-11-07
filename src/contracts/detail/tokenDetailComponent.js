import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import TokenPriceChart from './tokenPriceChart'

// Forms
import BuyForm from './buyForm'
import SellForm from './sellForm'
import BurnForm from './burnForm'
import SpendForm from './spendForm'

const insertIntoArray = (arr, value) => {
    return arr.reduce((result, element, index, array) => {
        result.push(element);
        if (index < array.length - 1) {
            result.push(value);
        }
        return result;
    }, []);
};

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

  spendEscrow(spendAmount){
    this.props.spendEscrow(this.props.contractData._id, spendAmount)
    if(this.props.closeModalFunction) return this.props.closeModalFunction()
  }

  render() {
    return(
      <main className="contract-item-container">

        <div className="">
          <div className="icon-holder">
            <div
              className="icon"
              style={{'backgroundImage': 'url(\'' + this.props.contractData.contractOptions.avatarUrl + '\')'}}>
            </div>
          </div>

          <div className="feed-title">{this.props.contractData.contractOptions.name}
            <small>{insertIntoArray(this.props.contractData.words || [], ' • ')}</small>
          </div>
        </div>

        <div className="contractOptions">
          <div>
            <div>Pledged</div>
            <div>{this.props.contractData.contractEscrowBalance}</div>
          </div>
          <div>
            <div>Tokens</div>
            <div>{this.props.contractData.tokenLedgerCount}</div>
          </div>
          <div>
            <div>Collect</div>
            <div style={{color: this.props.contractData.contractOptions.ownerCanBurn ? '#129c17' : '#d61717'}}>
              {this.props.contractData.contractOptions.ownerCanBurn ? '✔' : '✘'}
            </div>
          </div>
          <div>
            <div>Spend</div>
            <div style={{color: this.props.contractData.contractOptions.ownerCanDrain ? '#129c17' : '#d61717'}}>
              {this.props.contractData.contractOptions.ownerCanDrain ? '✔' : '✘'}
            </div>
          </div>
        </div>

        <TokenPriceChart data={this.props.contractData.tokenHistory}/>

        <section style={{height: '320px'}}>
          <Tabs>

            <TabList>
              <Tab>Pledge</Tab>
              <Tab disabled={false}> Withdraw </Tab>
              <Tab style={this.props.contractData.contractOptions.ownerCanBurn ? {}: {textDecoration: 'line-through'}}
                disabled={true}> Collect {false ? '&#x1f512;': ''}</Tab>
              <Tab style={this.props.contractData.contractOptions.ownerCanDrain ? {}: {textDecoration: 'line-through'}}
                disabled={true}> Spend {false ? '&#x1f512;': ''}
              </Tab>
            </TabList>

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

              <BurnForm
                tokenLedgerCount={this.props.contractData.tokenLedgerCount}
                burnTokenFunction={this.burnTokens.bind(this)}/>

            </TabPanel>
            <TabPanel>

              <SpendForm
                contractEscrowBalance={this.props.contractData.contractEscrowBalance}
                spendEscrowFunction={this.spendEscrow.bind(this)}/>

            </TabPanel>
          </Tabs>

        </section>

      </main>
    )
  }
}


export default FormComponent
