import React, { Component } from 'react'

import ContractCreate from '../../contracts/create/CreateContractContainer'


class Profile extends Component {
  constructor(props, {}) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-6"></div>
          <div className="pure-u-1 pure-u-md-2-3">
            <div style={{marginTop: '1em'}}>

              <ContractCreate/>

            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
