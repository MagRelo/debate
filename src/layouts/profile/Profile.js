import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import FollowToggleContainer from '../../user/ui/followbuttons/FollowToggleContainer'
import TokenFormContainer from '../../user/ui/tokenTransaction/FormContainer'

import TokenPriceChart from '../../user/ui/tokenPriceChart/tokenPriceChartContainer'

import TokenDetail from '../../user/ui/tokenDetail/tokenDetailContainer'

import FeedContainer from '../../messages/feed/FeedContainer'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  calculatePriceTrend(tokenHistoryArray, salePriceOfCurrentToken){
    const trend = 140

    // Temp hack: grab total over last four prices and compare with most recent
    let totalPrice = tokenHistoryArray.slice(0, 4)
      .reduce((sum, current)=>{
        return sum + current.salePriceOfCurrentToken
      },0)

    const lastFourAverage = totalPrice/4

    if(lastFourAverage > 0){
      const priceRatio = (1 / (lastFourAverage/salePriceOfCurrentToken))
      return (trend * priceRatio).toFixed(3)
    }

    return trend
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

                      {this.props.userList
                        .filter((targetUser)=>{
                          return targetUser.tokensOwned && targetUser.tokensOwned > 0
                        })
                        .map((targetUser) =>
                          <tr key={targetUser._id}>
                            <td>
                              {targetUser.name}
                            </td>
                            <td>{targetUser.tokensOwned}</td>
                            <td>
                              <img className="priceTrendArrow"
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Left_simple_arrow_-_black.svg"
                                style={{
                                  'transform': 'rotateZ(' + this.calculatePriceTrend(targetUser.tokenHistory, targetUser.salePriceOfCurrentToken) + 'deg)',
                                  'fill': this.calculatePriceTrend(targetUser.tokenHistory, targetUser.salePriceOfCurrentToken) > 50 ? 'green' : 'red'
                                }}></img>
                            </td>
                            <td style={{'textAlign': 'center'}}></td>
                          </tr>
                        )
                      }

                    </tbody>
                  </table>


                </TabPanel>
                <TabPanel>

                  <TokenDetail contractData={this.props.authData}/>

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
