import React, { Component } from 'react'
import {Link} from 'react-router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

import WalletListContainer from '../../user/ui/walletList/walletListContainer'


// import CreateContractButton from '../../contracts/create/CreateContractContainer'
// import ContractList from '../../contracts/list/contractListContainer'

//
// <TabPanel>
//   <Link className="pure-button pure-button-primary" to="/contract/add"> New Group </Link>
//   <ContractList contractList={this.props.authData.contracts} />
// </TabPanel>
//
// <TabPanel>
//   <ContractList contractList={this.props.currentUser.walletArray} />
// </TabPanel>


// import FeedContainer from '../../messages/feed/FeedContainer'

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
                  <Tab>My Groups</Tab>
                  <Tab>Wallet</Tab>
                </TabList>

              </Tabs>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
