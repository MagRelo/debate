import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import FollowToggleContainer from '../../user/ui/followbuttons/FollowToggleContainer'
import TokenFormContainer from '../../user/ui/tokenTransaction/FormContainer'

import TokenPriceChart from '../../user/ui/tokenPriceChart/tokenPriceChartContainer'

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
          <div className="pure-u-1-1">
            <h1>{this.props.authData.name}</h1>

              <Tabs>

                <TabList>
                  <Tab>My Wallet</Tab>
                  <Tab>My Token</Tab>
                </TabList>

                <TabPanel>

                  <TokenPriceChart data={this.props.authData.tokenHistory}/>

                  <p><strong>Available Balance:</strong>
                    <span className="currency-box">
                      ∯ {this.props.authData.balance}
                    </span>
                  </p>

                  <h2>My Token</h2>
                  <table className="pure-table pure-table-horizontal table-100">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Tokens</td>
                        <td>Trend</td>
                        <td>View</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.userList.map((targetUser) =>

                          {targetUser._id === this.props.authData._id ?

                            <tr key={targetUser._id}>
                              <td>
                                {targetUser.name}
                              </td>
                              <td>&#536; {targetUser.priceOfNextToken}</td>
                              <td>&#536; {targetUser.salePriceOfCurrentToken}</td>
                              <td style={{'textAlign': 'center'}}>

                                {
                                  // <FollowToggleContainer
                                  //   userId={this.props.authData._id}
                                  //   targetId={targetUser._id}
                                  //   isFollowing={targetUser.followed}/>
                                }

                              </td>
                            </tr>

                          : null
                          }

                        ) //end map
                      }

                    </tbody>
                  </table>

                  <h2>Other Tokens</h2>
                  <table className="pure-table pure-table-horizontal table-100">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Tokens</td>
                        <td>Trend</td>
                        <td>View</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.userList.map((targetUser)=>
                        <tr key={targetUser._id}>
                          <td>
                            {targetUser.name}
                          </td>
                          <td>&#536; {targetUser.priceOfNextToken}</td>
                          <td>&#536; {targetUser.salePriceOfCurrentToken}</td>
                          <td style={{'textAlign': 'center'}}>

                            {
                              // <FollowToggleContainer
                              //   userId={this.props.authData._id}
                              //   targetId={targetUser._id}
                              //   isFollowing={targetUser.followed}/>
                            }

                          </td>
                        </tr>
                        )
                      }

                    </tbody>
                  </table>


                </TabPanel>
                <TabPanel>

                  <TokenPriceChart data={this.props.authData.tokenHistory}/>


                  <div className="account-details">
                    <p><strong>Buy Price</strong>
                      <span className="currency-box">
                        ∯ {this.props.authData.priceOfNextToken}
                      </span>
                    </p>
                    <p><strong>Token Supply</strong>
                      <span className="currency-box">
                        {this.props.authData.tokenLedgerCount}
                      </span>
                    </p>
                    <p><strong>Escrow Balance</strong>
                      <span className="currency-box">
                        ∯ {this.props.authData.tokenLedgerEscrowBalance}
                      </span>
                    </p>
                    <p><strong>Sale Price</strong>
                      <span className="currency-box">
                        ∯ {this.props.authData.salePriceOfCurrentToken}
                      </span>
                    </p>
                  </div>

                  <TokenFormContainer userId={this.props.authData._id} targetId={this.props.authData}/>

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
