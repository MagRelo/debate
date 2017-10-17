
import React, { Component } from 'react'

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
        <form className="pure-form pure-form-stacked " onSubmit={this.handleSubmit.bind(this)}>

          <label>Name</label>
          <input
            name="name"
            onChange={this.handleInputChange.bind(this)}>
          </input>

          <label>Avatar Url</label>
          <input
            name="avatarUrl"
            onChange={this.handleInputChange.bind(this)}>
          </input>

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