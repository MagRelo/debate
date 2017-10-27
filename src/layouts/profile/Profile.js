import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import FollowToggleContainer from '../../user/ui/followbuttons/FollowToggleContainer'
import TokenFormContainer from '../../user/ui/tokenTransaction/FormContainer'

import TokenPriceChart from '../../user/ui/tokenPriceChart/tokenPriceChartContainer'

import TokenDetail from '../../user/ui/tokenDetail/tokenDetailContainer'

import WalletListContainer from '../../user/ui/walletList/walletListContainer'

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

              <Tabs>

                <TabList>
                  <Tab>My Wallet</Tab>
                  <Tab>My Token</Tab>
                  <Tab>Profile</Tab>
                </TabList>

                <TabPanel>

                  <TokenPriceChart data={this.props.authData.tokenHistory}/>

                  <h2>Tokens in my wallet</h2>
                  <WalletListContainer
                    contractList={
                        // filter out contracts that the current user doesn't own
                        this.props.userList.filter((contractData)=>{
                          return contractData.tokensOwned && contractData.tokensOwned > 0
                        })
                      }
                  />

                </TabPanel>
                <TabPanel>

                  <TokenDetail contractData={this.props.authData}/>

                  <h2>Token Holders</h2>
                  <WalletListContainer
                    contractList={
                        // filter out contracts that the current user doesn't own
                        this.props.userList.filter((contractData)=>{
                          return contractData[this.props.authData._id]
                        })
                      }
                  />

                </TabPanel>
                <TabPanel>

                  <p>{this.props.authData.name}</p>

                  <p><strong>Available Balance:</strong>
                    <span className="currency-box">
                      ∯ {this.props.authData.balance}
                    </span>
                  </p>

                  <hr></hr>

                  <LogoutButtonContainer/>

                </TabPanel>
              </Tabs>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
