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
            <img className="profile-logo" src={this.props.authData.avatarUrl}></img>

            <div>

              <p><strong>Un-staked Balance:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.balance}
                </span>
              </p>


              <h2>Followers: {this.props.authData.followerCount}</h2>
              <p><strong>Amount Staked on You:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.amountStakedonYou}
                </span>
              </p>

              <h2>Following: {this.props.authData.followingCount}</h2>
              <p><strong>Amount You've Staked:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.amountStaked}
                </span>
              </p>

              <p><strong>Total Balance:</strong>
                <span className="currency-box">
                  &#536; {this.props.authData.totalBalance}
                </span>
              </p>
            </div>

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
