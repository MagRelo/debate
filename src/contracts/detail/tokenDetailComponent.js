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


  drainDisabled(){
    return (!this.props.currentUser || !this.props.contractData.owner ||
      this.props.currentUser._id !== this.props.contractData.owner._id ||
      !this.props.contractData.contractOptions.ownerCanDrain)
  }


  burnDisabled(){
    return (!this.props.currentUser || !this.props.contractData.owner ||
      this.props.currentUser._id !== this.props.contractData.owner._id ||
      !this.props.contractData.contractOptions.ownerCanBurn)
  }

  buyTokens(tokenCount, purchasePrice){
    this.props.buyTokens(this.props.currentUser, this.props.contractData._id, tokenCount, purchasePrice)
    if(this.props.closeModalFunction) return this.props.closeModalFunction()
  }

  sellTokens(tokenCount){
    this.props.sellTokens(this.props.currentUser, this.props.contractData._id, tokenCount)
    if(this.props.closeModalFunction) return this.props.closeModalFunction()
  }

  burnTokens(targetUserId, tokenCount){

    this.props.burnTokens(
      this.props.currentUser,
      this.props.contractData._id,
      targetUserId,
      tokenCount
    )

    if(this.props.closeModalFunction) return this.props.closeModalFunction()
  }

  spendEscrow(spendAmount){
    this.props.drainEscrow(this.props.currentUser, this.props.contractData._id, spendAmount)
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
            <div style={{color: '#129c17'}}>
              ∯ {this.props.contractData.contractEscrowBalance}</div>
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

        <h2>Contract Information</h2>
        <div className="">

          <div className="icon-holder">
            <div
              className="icon"
              style={{'backgroundImage': 'url(\'' + this.props.contractData.owner.avatarUrl + '\')'}}>
            </div>
          </div>

          <div className="feed-title">{this.props.contractData.owner.name}
            <small>@{this.props.contractData.owner.username}</small>
          </div>

        </div>


        {!this.props.currentUser ? null
          :

          <section style={{height: '320px'}}>
            <Tabs>

              <TabList>
                <Tab>Pledge</Tab>
                <Tab disabled={false}> Withdraw </Tab>
                <Tab
                  style={this.props.contractData.contractOptions.ownerCanBurn ? {}: {textDecoration: 'line-through'}}
                  disabled={this.burnDisabled()}>
                    Collect {false ? '&#x1f512;': ''}
                </Tab>
                <Tab
                  style={this.props.contractData.contractOptions.ownerCanDrain ? {}: {textDecoration: 'line-through'}}
                  disabled={this.drainDisabled()}>
                    Spend {false ? '&#x1f512;': ''}
                </Tab>
              </TabList>

              <TabPanel>

                <BuyForm
                  buyTokenFunction={this.buyTokens.bind(this)}
                  tokenBuyPrice={this.props.contractData.tokenBuyPrice}
                  loggedIn={!!this.props.currentUser}
                  availableBalance={this.props.currentUser.balance}/>

              </TabPanel>
              <TabPanel>

                <SellForm
                  sellTokenFunction={this.sellTokens.bind(this)}
                  tokenSellPrice={this.props.contractData.tokenSellPrice}
                  loggedIn={!!this.props.currentUser}
                  ownedTokenCount={this.props.tokensOwned}/>

              </TabPanel>
              <TabPanel>

                <BurnForm
                  loggedIn={!!this.props.currentUser}
                  tokenLedger={this.props.contractData.tokenLedger}
                  burnTokenFunction={this.burnTokens.bind(this)}/>

              </TabPanel>
              <TabPanel>

                <SpendForm
                  loggedIn={!!this.props.currentUser}
                  contractEscrowBalance={this.props.contractData.contractEscrowBalance}
                  spendEscrowFunction={this.spendEscrow.bind(this)}/>

              </TabPanel>
            </Tabs>

          </section>

        }
      </main>
    )
  }
}


export default FormComponent
