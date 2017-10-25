
import React, { Component } from 'react'
import {Typeahead}  from 'react-typeahead';

class SignUpForm extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      name: '',
      avatarUrl: ''
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitUser(this.state.name, this.state.avatarUrl)
  }

  render() {
    return(
      <main className="signup">
        <h2>Create User</h2>
        <form className="pure-form pure-form-stacked " onSubmit={this.handleSubmit.bind(this)}>

          <fieldset>
            <label>Name</label>
            <input
              name="name"
              onChange={this.handleInputChange.bind(this)}>
            </input>
          </fieldset>

          <fieldset>
            <label>Avatar Url</label>
            <input
              name="avatarUrl"
              onChange={this.handleInputChange.bind(this)}>
            </input>  
          </fieldset>

          <button
            type="submit"
            className="pure-button pure-button-primary"> Submit
          </button>

        </form>
      </main>
    )
  }
}

export default SignUpForm
