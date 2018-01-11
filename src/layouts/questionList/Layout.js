import React, { Component } from 'react'

import ContractList from '../../contracts/list/contractListContainer'
import CreateContractButton from '../../contracts/create/CreateContractContainer'


class Profile extends Component {
  constructor(props, {}) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.getList()
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1 pure-u-lg-1-6"></div>
          <div className="pure-u-1 pure-u-lg-2-3">
            <div style={{marginTop: '1em'}}>
              <ContractList/>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
