import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import FollowToggleContainer from '../../user/ui/followbuttons/FollowToggleContainer'

import TokenPriceChart from '../../user/ui/tokenPriceChart/tokenPriceChartContainer'

import FeedContainer from '../../messages/feed/FeedContainer'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  testData(){

    let data = [1,2,3,4].map((data, index)=>{
      return {
        name: 'week ' + data,
        priceOfNextToken: index * 10,
        salePriceOfCurrentToken: index * 12
      }
    })

    return data
  }


  render() {
    return(
      <main className="container">

        <div style={{
            'backgroundImage': 'url(' + this.props.authData.avatarUrl + ')',
            'backgroundSize': 'cover',
            'minHeight': '160px',
            'marginTop': '1em'
          }}>
        </div>
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
                    <p><strong>Tokens outstanding</strong>
                      <span className="currency-box">
                        {this.props.authData.tokensOutstanding}
                      </span>
                    </p>
                    <p><strong>Buy Price</strong>
                      <span className="currency-box">
                        {this.props.authData.priceOfNextToken}
                      </span>
                    </p>
                    <p><strong>Sale Price</strong>
                      <span className="currency-box">
                        {this.props.authData.salePriceOfCurrentToken}
                      </span>
                    </p>
                  </div>
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
