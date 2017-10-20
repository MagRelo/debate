import React, { Component } from 'react'

import ProfileInfo from './ProfileInfo'

import LogoutButtonContainer from '../../ui/logoutbutton/LogoutButtonContainer'
import FollowToggleContainer from '../../ui/followbuttons/FollowToggleContainer'

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
            <h1>Profile</h1>
            <ProfileInfo profileObject={{name: this.props.authData.name, avatarUrl: this.props.authData.avatarUrl }} />
            <hr></hr>
            <LogoutButtonContainer/>
            <hr></hr>

            <table className="pure-table">
              <tbody>

                {this.props.userList.map((targetUser)=>
                  <tr key={targetUser._id}>
                    <td>
                      {targetUser.name}
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

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
