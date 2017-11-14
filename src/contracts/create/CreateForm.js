import React, { Component } from 'react'
import { Link } from 'react-router'
import {Tokenizer}  from 'react-typeahead';

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


class CreateContractForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      name: '',
      avatarUrl: '',
      wordArray: this.props.searchWords,
      tokenBasePrice: 10,
      exponent: 2,
      exponentDivisor: 10000,
      ownerCanBurn: true,
      ownerCanDrain: true,
      pricingOption: 'temp_Pricing_flat'
    }
  }

  componentDidMount(){
    this.props.getSearchWords()
  }

  // Form functions
  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()

    const contractObj = {
      name: this.state.name,
      avatarUrl: this.state.avatarUrl,
      wordArray: this.props.searchWords,
      ownerCanBurn: this.state.ownerCanBurn,
      ownerCanDrain: this.state.ownerCanDrain,
      tokenBasePrice: 10,
      exponent: 2,
      exponentDivisor: 10000
    }

    // flatten pricing curve, if selected
    if(this.state.pricingOption === 'temp_Pricing_flat'){
      contractObj.exponent = 0
      contractObj.exponentDivisor = 1
    }

    this.props.submitContract(this.props.currentUser, contractObj)
  }

  handleOptionChange(changeEvent) {
    this.setState({ pricingOption: changeEvent.target.value })
  }

  toggleBurn() {
    this.setState({ ownerCanBurn: !this.state.ownerCanBurn })
  }

  toggleDrain() {
    this.setState({ ownerCanDrain: !this.state.ownerCanDrain })
  }

  getNewSearchPhrase(event){
    event.preventDefault()

    this.props.getSearchWords()
  }

  render() {
    return(

      <div>

        <h2>New Group</h2>

        <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
          <p>Give your group a name, an avatar, and a three-word phrase to help others find your group.</p>
          <fieldset>

            <label>Group Name</label>
            <input
              className="pure-input-1"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange.bind(this)}></input>

            <label>Group Avatar (url)</label>
            <input
              className="pure-input-1"
              type="url"
              name="avatarUrl"
              value={this.state.avatarUrl}
              onChange={this.handleChange.bind(this)}></input>

            <label>Search Phrase</label>
            <input className="pure-input-1-3" style={{textAlign: 'center'}}type="text" value={this.props.searchWords[0]} readOnly></input>
            <input className="pure-input-1-3" style={{textAlign: 'center'}}type="text" value={this.props.searchWords[1]} readOnly></input>
            <input className="pure-input-1-3" style={{textAlign: 'center'}}type="text" value={this.props.searchWords[2]} readOnly></input>

            <button
              className="pure-button pure-button-primary"
              onClick={this.getNewSearchPhrase.bind(this)}>generate new words</button>
          </fieldset>

          <h3>Pledge options</h3>
          <p>Users will pledge value to the contract and get tokens in return. Use the fields below to adjust the pricing curve for the tokens.  </p>

          <fieldset>
            <label className="pure-radio">
              <input
                type="radio"
                value="temp_Pricing_flat"
                checked={this.state.pricingOption === 'temp_Pricing_flat'}
                onChange={this.handleOptionChange.bind(this)}></input> Flat
            </label>
            <label className="pure-radio">
              <input
                type="radio"
                value="temp_Pricing_exp"
                checked={this.state.pricingOption === 'temp_Pricing_exp'}
                onChange={this.handleOptionChange.bind(this)}></input> Exponential
            </label>
            <label className="pure-radio">
              <input type="radio" value={false} disabled></input> Custom Pricing Curve (Coming Soon)
            </label>
          </fieldset>

          <h3>Withdraw options</h3>
          <p>If a user chooses to remove their pledge they can turn in their tokens and claim a share of the escrow balance.</p>
          <fieldset>
            <label className="pure-radio">
              <input type="radio" checked={true}></input> Each token receives equal share
            </label>
            <label className="pure-radio">
              <input type="radio" disabled></input> Custom Pricing Curve (Coming Soon)
            </label>
          </fieldset>

          <h3>Collect options</h3>
          <p>"Collect" allows the owner of the contract to collect on a pledge. This removes tokens without affecting the escrow balance.</p>
          <fieldset>
            <label className="pure-checkbox">
              <input
                type="checkbox"
                checked={this.state.ownerCanBurn}
                onChange={this.toggleBurn.bind(this)}></input> Allow owner to collect pledges
            </label>
          </fieldset>

        <h3>Spend options</h3>
        <p>"Spend" allows the owner of the contract to remove value from the escrow balance. This does not affect the number of tokens.</p>
          <fieldset>
            <label className="pure-checkbox">
              <input
                type="checkbox"
                checked={this.state.ownerCanDrain}
                onChange={this.toggleDrain.bind(this)}></input> Allow owner to spend escrow balance
            </label>
          </fieldset>

          <button
            type="submit"
            className="pure-button pure-button-primary"
            disabled={!this.props.currentUser}
            onClick={this.openModal}> + Add contract
          </button>
        </form>

      </div>


    )
  }
}

export default CreateContractForm


// <fieldset>
//   <p>A simple escrow contract: what you put in you can take out.</p>
//   <button className="pure-button pure-button-primary" name="se" onClick={this.handleSubmit.bind(this)}>Simple escrow</button>
// </fieldset>
// <fieldset>
//   <p>Curation markets introduce an accelerating pricing curve to incentivize early adoptors.</p>
//   <button className="pure-button pure-button-primary" name="cm" onClick={this.handleSubmit.bind(this)}>Curation Market</button>
// </fieldset>
// <fieldset>
//   <p>Hive Commons markets are a curation market that allow the contract owner to withdraw funds from escrow.
//     This can be used to fund a charitable cause or provide on-going support for a project.</p>
//   <button className="pure-button pure-button-primary" name="hm" onClick={this.handleSubmit.bind(this)}>Hive Market</button>
// </fieldset>
// <fieldset>
//   <p>Trust is risk allows the contract owner to delete your tokens. This can be used to prove that you trust the owner.</p>
//   <button className="pure-button pure-button-primary" name="tr" onClick={this.handleSubmit.bind(this)}>Trust is Risk</button>
// </fieldset>
// <fieldset>
//   <p>Curated trust combines a curation market with Trust is Risk: the earlier you trust someone the less it costs.</p>
//   <button className="pure-button pure-button-primary" name="cr" onClick={this.handleSubmit.bind(this)}>Curated Risk</button>
// </fieldset>
