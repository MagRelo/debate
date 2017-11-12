import React, { Component } from 'react'

import ContractDetail from '../../contracts/detail/tokenDetailContainer'


class Profile extends Component {
  constructor(props, {}) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.getContract(this.props.routeParams.contractId)
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-6"></div>
          <div className="pure-u-1 pure-u-md-2-3">
            <div style={{marginTop: '1em'}}>
              {this.props.selectedContract ?                
                <ContractDetail contractData={this.props.selectedContract}/>
                :
                null
              }

            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
