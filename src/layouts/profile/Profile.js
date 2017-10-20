import React, { Component } from 'react'

// import ProfileInfo from './ProfileInfo'

import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import FollowToggleContainer from '../../user/ui/followbuttons/FollowToggleContainer'

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
            <span>
              <img className="profile-logo" src={this.props.authData.avatarUrl}></img>
              <p><strong>Available Balance:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.balance}
                </span>
              </p>
              <p><strong>Amount You've Staked:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.amountStaked}
                </span>
              </p>
              <p><strong>Amount Staked on You:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.amountStakedonYou}
                </span>
              </p>
              <p><strong>Total Balance:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.totalBalance}
                </span>
              </p>
            </span>

            <hr></hr>

            <table className="pure-table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Cost</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {this.props.userList.map((targetUser)=>
                  <tr key={targetUser._id}>
                    <td>
                      {targetUser.name}
                    </td>
                    <td>
                      <span className={targetUser.followed ? 'currency-box' : 'currency-box red-text'}>
                        &#536; 10
                      </span>
                    </td>
                    <td>
                      <FollowToggleContainer
                        userId={this.props.authData._id}
                        targetId={targetUser._id}
                        isFollowing={targetUser.followed}/>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <hr></hr>

            <LogoutButtonContainer/>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
