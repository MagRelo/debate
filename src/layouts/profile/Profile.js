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
                  <Tab>Me</Tab>
                  <Tab>Following</Tab>
                  <Tab>Followers</Tab>
                  <Tab>Activity</Tab>
                </TabList>

                <TabPanel>

                  <TokenPriceChart data={this.props.authData.tokenHistory}/>

                  <h3>My Token</h3>
                  <div className="account-details">
                    <p><strong>Buy Price</strong>
                      <span className="currency-box">
                        &#536; {this.props.authData.priceOfNextToken}
                      </span>
                    </p>
                    <p><strong>Token Supply</strong>
                      <span className="currency-box">
                        {this.props.authData.tokenSupply}
                      </span>
                    </p>
                    <p><strong>Escrow Balance</strong>
                      <span className="currency-box">
                        &#536; {this.props.authData.escrowBalance}
                      </span>
                    </p>
                    <p><strong>Sale Price</strong>
                      <span className="currency-box">
                        &#536; {this.props.authData.salePriceOfCurrentToken}
                      </span>
                    </p>
                  </div>

                  <TokenFormContainer userId={this.props.authData._id} targetId={this.props.authData}/>

                <hr></hr>
                  <LogoutButtonContainer/>

                </TabPanel>

                <TabPanel>

                  <TokenPriceChart data={this.props.authData.tokenHistory}/>

                  <h2>Manage Stakes</h2>
                  <p><strong>Available Balance:</strong>
                    <span className="currency-box">
                      &#536; {this.props.authData.balance}
                    </span>
                  </p>
                  <table className="pure-table pure-table-horizontal table-100">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Buy</td>
                        <td>Sell</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.userList.map((targetUser)=>
                        <tr key={targetUser._id}>
                          <td>
                            {targetUser.name}
                          </td>
                          <td>&#536; {targetUser.priceOfNextToken}</td>
                          <td>&#536; {targetUser.salePriceOfCurrentToken}</td>
                          <td style={{'textAlign': 'center'}}>
                            <FollowToggleContainer
                              userId={this.props.authData._id}
                              targetId={targetUser._id}
                              isFollowing={targetUser.followed}/>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                </TabPanel>
                <TabPanel>
                  <p>coming soon</p>
                </TabPanel>
                <TabPanel>

                  <FeedContainer messages={this.props.userActivity}/>

                </TabPanel>

              </Tabs>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
