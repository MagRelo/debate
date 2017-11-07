import React, { Component } from 'react'
import { Link } from 'react-router'

import ContractDetail from '../detail/tokenDetailContainer'

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

const insertIntoArray = (arr, value) => {
    return arr.reduce((result, element, index, array) => {
        result.push(element);
        if (index < array.length - 1) {
            result.push(value);
        }
        return result;
    }, []);
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


  componentDidMount(){
    console.log('list mounted')
    this.props.loadList()
  }



  // Modal functions
  openModal(data) {
    this.setState({
      modalIsOpen: true,
      selectedContract: data
    });
  }
  afterOpenModal() { }
  closeModal() { this.setState({modalIsOpen: false}); }



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

              <ContractDetail contractData={this.state.selectedContract} closeModalFunction={this.closeModal}/>

            </Modal>

            <ul className="contractList">
              {this.props.globalList
                .map((contractData) =>

                  <li key={contractData._id}>
                    <Link to={"/contract/" + contractData._id}>


                      <div className="contract-item-container">

                        <div className="icon-holder">
                          <div
                            className="icon"
                            style={{'backgroundImage': 'url(\'' + contractData.contractOptions.avatarUrl + '\')'}}>
                          </div>
                        </div>

                        <div className="feed-title"> {contractData.contractOptions.name}
                          <small>{insertIntoArray(contractData.words, ' • ')}</small>
                        </div>

                        <div className="contractOptions">
                          <div>
                            <div>Pledged</div>
                            <div>{contractData.contractEscrowBalance}</div>
                          </div>
                          <div>
                            <div>Tokens</div>
                            <div>{contractData.tokenLedgerCount}</div>
                          </div>
                          <div>
                            <div>Collect</div>
                            <div>{contractData.contractOptions.ownerCanBurn ? '✔' : '✘'}</div>
                          </div>
                          <div>
                            <div>Spend</div>
                            <div>{contractData.contractOptions.ownerCanDrain ? '✔' : '✘'}</div>
                          </div>
                        </div>

                      </div>

                    </Link>
                  </li>

                )
              }
            </ul>

          </div>
        </div>
      </main>
    )
  }
}

export default FormComponent
