import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import TokenDetail from '../../user/ui/tokenDetail/tokenDetailContainer'

import WalletListContainer from '../../user/ui/walletList/walletListContainer'
import ContractListContainer from '../../user/ui/contractList/contractListContainer'

import FeedContainer from '../../messages/feed/FeedContainer'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-3"></div>
          <div className="pure-u-1 pure-u-md-1-3">
            <h1>{this.props.authData.name}</h1>
            <p>Servésa Balance:
              <span className="currency-box">
                ∯ {this.props.authData.balance}
              </span>
            </p>

              <Tabs>

                <TabList>
                  <Tab>My Wallet</Tab>
                  <Tab>Profile</Tab>
                  <Tab>Search</Tab>
                </TabList>

                <TabPanel>

                  <h2>Tokens in my wallet</h2>
                  <WalletListContainer contractList={this.props.authData.walletArray} />

                </TabPanel>
                <TabPanel>

                  <TokenDetail
                    tokensOwned={20}
                    contractData={this.props.authData}
                    tokenHolderList={this.props.authData.tokenLedgerArray}/>

                  <hr></hr>

                  <LogoutButtonContainer/>

                </TabPanel>
                <TabPanel>
                  <ContractListContainer contractList={this.props.userList} />
                </TabPanel>
              </Tabs>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
