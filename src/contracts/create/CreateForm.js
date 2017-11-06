import React, { Component } from 'react'
import { Link } from 'react-router'

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

const marketOptions = {
  se: {
    name: 'simpleEscrow',
    tokenBasePrice: 10,
    exponent: 0,
    exponentDivisor: 1,
    ownerCanBurn: false,
    ownerCanDrain: false
  },
  cm: {
    name: 'curationMarket',
    tokenBasePrice: 10,
    exponent: 2,
    exponentDivisor: 10000,
    ownerCanBurn: false,
    ownerCanDrain: false
  },
  hm: {
    name: 'hiveMarket',
    tokenBasePrice: 10,
    exponent: 2,
    exponentDivisor: 10000,
    ownerCanBurn: false,
    ownerCanDrain: true
  },
  tr: {
    name: 'trustIsRisk',
    tokenBasePrice: 10,
    exponent: 0,
    exponentDivisor: 1,
    ownerCanBurn: true,
    ownerCanDrain: false
  },
  cr: {
    name: 'curatedRisk',
    tokenBasePrice: 10,
    exponent: 2,
    exponentDivisor: 10000,
    ownerCanBurn: true,
    ownerCanDrain: true
  }
}

// Editor elements
import Editor from 'react-medium-editor';
import {Tokenizer}  from 'react-typeahead';

class ComposeMessage extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Modal functions
  openModal() { this.setState({modalIsOpen: true}); }
  afterOpenModal() {}
  closeModal() { this.setState({modalIsOpen: false}); }


  // Form functions
  handleChange(event) {
    const fieldName = event.target.name
    this.setState({fieldName: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({modalIsOpen: false});

    console.log('sending', marketOptions[event.target.name].name)

    this.props.submitContract(marketOptions[event.target.name])
  }

  render() {
    return(

      <div>

        <div className="open-compose-button-container">
          <button
            className="pure-button pure-button-primary"
            onClick={this.openModal}> + Add contract
          </button>
        </div>


        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Create Contract">

            <div className="compose-container">

              <div className="compose-title-container">
                <span className="title">Create Contract</span>
              </div>

              <div className="compose-editor-container">

                {this.props.loading ?

                  <div>
                    <div className="loader"></div>
                  </div>

                :

                  <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>

                    <fieldset>
                      <p>aksjdhfakjdshf asdkjf asdkjfhsdkfjhasdlfkjh askdjhf lsdjfhaslkjf.</p>
                      <button className="pure-button pure-button-primary" name="se" onClick={this.handleSubmit.bind(this)}>Simple escrow</button>
                    </fieldset>
                    <fieldset>
                      <p>aksjdhfakjdshf asdkjf asdkjfhsdkfjhasdlfkjh askdjhf lsdjfhaslkjf.</p>
                      <button className="pure-button pure-button-primary" name="cm" onClick={this.handleSubmit.bind(this)}>Curation Market</button>
                    </fieldset>
                    <fieldset>
                      <p>aksjdhfakjdshf asdkjf asdkjfhsdkfjhasdlfkjh askdjhf lsdjfhaslkjf.</p>
                      <button className="pure-button pure-button-primary" name="hm" onClick={this.handleSubmit.bind(this)}>Hive Market</button>
                    </fieldset>
                    <fieldset>
                      <p>aksjdhfakjdshf asdkjf asdkjfhsdkfjhasdlfkjh askdjhf lsdjfhaslkjf.</p>
                      <button className="pure-button pure-button-primary" name="tr" onClick={this.handleSubmit.bind(this)}>Trust is Risk</button>
                    </fieldset>
                    <fieldset>
                      <p>aksjdhfakjdshf asdkjf asdkjfhsdkfjhasdlfkjh askdjhf lsdjfhaslkjf.</p>
                      <button className="pure-button pure-button-primary" name="cr" onClick={this.handleSubmit.bind(this)}>Curated Risk</button>
                    </fieldset>

                  </form>

                }

              </div>

            </div>

          </Modal>
      </div>


    )
  }
}

export default ComposeMessage
