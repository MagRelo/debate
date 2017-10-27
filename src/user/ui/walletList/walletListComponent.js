import React, { Component } from 'react'
import { Link } from 'react-router'

import TokenDetail from '../tokenDetail/tokenDetailContainer'

import Modal from 'react-modal';
const customStyles = {
  overlay: {
   backgroundColor   : 'rgba(16, 58, 82, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-40%',
    transform             : 'translate(-50%, -50%)',
    padding               : 'none'
  }
};



class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      modalIsOpen: false,
      selectedContract: {
        name: 'test',
        tokenHistory: []
      }
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  // Modal functions
  openModal(data) {
    this.setState({
      modalIsOpen: true,
      selectedContract: data
    });
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return(
      <main className="">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel=''>


              <TokenDetail contractData={this.state.selectedContract}/>


            </Modal>

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

                {this.props.contractList
                  .map((contractData) =>
                    <tr key={contractData._id}>
                      <td>
                        {contractData.name}
                      </td>
                      <td>{contractData.tokensOwned}</td>
                      <td>
                        <img className="priceTrendArrow"
                          src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Left_simple_arrow_-_black.svg"
                          style={{
                            'transform': 'rotateZ(' + this.calculatePriceTrend(contractData.tokenHistory, contractData.salePriceOfCurrentToken) + 'deg)',
                            'fill': this.calculatePriceTrend(contractData.tokenHistory, contractData.salePriceOfCurrentToken) > 50 ? 'green' : 'red'
                          }}></img>
                      </td>
                      <td style={{'textAlign': 'center'}}>
                        <button
                          onClick={()=>{this.openModal(contractData)}}
                          className="pure-button pure-button-primary"> > </button>
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>

          </div>
        </div>
      </main>
    )
  }
}

export default FormComponent
